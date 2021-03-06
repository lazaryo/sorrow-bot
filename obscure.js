'use strict';

const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

// Initialize **or load** the server configurations
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');
// I attach settings to client to avoid confusion especially when moving to a modular bot.
bot.settings = new Enmap({provider: new Provider({name: "settings"})});
// Just setting up a default configuration object here, to have somethign to insert.
const defaultSettings = {
    prefix: '<@!299851881746923520>',
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator"
}

// Colorful Console Logging
const chalk = require('chalk');
var clk = new chalk.constructor({enabled: true});

var cWarn = clk.bgYellow.black;
var cError = clk.bgRed.black;
var cDebug = clk.bgWhite.black;
var cGreen = clk.bold.green;
var cGrey = clk.bold.grey;
var cYellow = clk.bold.yellow;
var cBlue = clk.bold.blue;
var cRed = clk.bold.red;
var cServer = clk.bold.magenta;
var cUYellow = clk.bold.underline.yellow;
var cBgGreen = clk.bgGreen.black;

// Create New Guild Webhook
const hooks = config.webhooks;
const newGuildHook = new Discord.WebhookClient(hooks.newGuild.id, hooks.newGuild.token);
const blacklistHook = new Discord.WebhookClient(hooks.blacklist.id, hooks.blacklist.token);
const botLogHook = new Discord.WebhookClient(hooks.botLog.id, hooks.botLog.token);

const banned = require('./banned.json');
const safe = require('./safe.json');
const about = config.about;
let dictionary = '';
let serverSorrows = [];

var http = require('http');

var options = {
    host: 'malikdh.com',
    path: '/obscure-sorrows/api/dictionary'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        dictionary = data;
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();

bot.on('ready', () => {
    bot.guilds.forEach(guild => {
        if(!bot.settings.has(guild.id)) {
           bot.settings.set(guild.id, defaultSettings);
        }
    });
    
    checkBlacklist(bot, blacklistHook);
    console.log(cBlue(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`));
});

// response when messages are sent in a channel
bot.on("message", async (message) => {
    var lexicon = JSON.parse(dictionary);
    for (var word in lexicon) {
        serverSorrows.push(lexicon[word]);
    }
    
    const messagePrefix = message.content.split(" ")[0];
    
    // Let's load the config. If it doesn't exist, use the default settings.
    // This is an extra security measure, in case enmap fails (it won't. better safe than sorry!)
    const guildConf = bot.settings.get(message.guild.id) || defaultSettings;
  
    // We also stop processing if the message does not start with our prefix.
    if (messagePrefix !== guildConf.prefix) return;

    if(!message.guild || message.author.bot) return;
    if (message.author.id == about.ownerID) return;
        
    if (message.channel.type == 'dm') return;
    if (message.channel.type !== 'text') return;
    
    // Then we use the config prefix to get our arguments and command:
    // const args = message.content.split(/\s+/g);
    // const command = args.shift().slice(guildConf.prefix.length).toLowerCase();
    
    let command = message.content.split(" ")[1];
    let args = message.content.split(" ").slice(2);
    // console.log("args: " + args);
    // console.log("command: " + command);

    var rn = Math.floor(Math.random() * (serverSorrows.length - 1));
    var path = './commands/';
    
    try {
        let commandFile = require(`${path}${command}.js`);
        commandFile.run(bot, message, args, serverSorrows, about, guildConf, rn, botUptime, banned, safe, checkID, checkWord, convertTime, displayWords, singleWord);
    } catch (err) {
        console.error(err);
        console.log(cRed(`From Guild: ${message.guild.name}`));
        console.log(cRed(`Guild ID: ${message.guild.id}`));
        console.log(cRed(`Owner ID: ${message.guild.owner.id}\n`));
        console.log(cRed(`Author Username: ${message.author.username}`));
        console.log(cRed(`Author ID: ${message.author.id}`));
    }
});

// When the bot joins a new server
bot.on("guildCreate", server => {
    // Initialize Default Settings for a new guild
    bot.settings.set(server.id, defaultSettings);
    
    let criticalInfo = {
        "name": server.name,
        "id": server.id,
        "ownerName": server.owner.displayName,
        "ownerID": server.owner.id,
        "memberCount": server.members.size,
        "botCount": server.members.filter(m => m.user.bot).size,
        "humanCount": server.members.filter(m => !m.user.bot).size,
        "joined": server.joinedTimestamp
    }
    
    if (criticalInfo.botCount / criticalInfo.memberCount * 100 >= 75 || criticalInfo.id == '302952448484704257') {
        if (checkID(bot, criticalInfo.id, 'blacklist')) {
            blacklistHook.send("**Bot Farm:** " + criticalInfo.name + " (" + criticalInfo.id + ") tried to add me within their server. Bots: " + criticalInfo.botCount).then(message => console.log(`\nSent message:\n${message.content}`)).catch(console.error);
            return server.leave();
        } else {
            banned.blacklist.push(criticalInfo.id);
            fs.writeFile("./banned.json", JSON.stringify(banned, "", "\t"), err => {
                bot.users.get("266000833676705792").send("**Bot Farm blacklisted:** " + criticalInfo.name + " (" + criticalInfo.id + ")\n" + (err ? "Failed to update database" : "Database updated."))
            }) 
            return server.leave();
        }
    }
    
    newServer(server, newGuildHook, criticalInfo);
});

bot.on("guildDelete", guild => {
    bot.settings.delete(guild.id);
});

// Error stuff
bot.on('error', (e) => console.error(cError(e)));
bot.on('warn', (e) => console.warn(cWarn(e)));

// Bot logging online
bot.login(config.token);

// Bot attempting to login if disconnected
bot.on("disconnected", () => {
	console.log(cRed("Disconnected") + " from Discord");
    botLogHook.send(`Disconnected from Discord on ${convertTime()}`);
    
	setTimeout(() => {
		console.log(cBlue("Attempting to log in..."));
		bot.login(config.token, (err, token) => {
			if (err) { console.log(err); setTimeout(() => { process.exit(1); }, 2000); }
			if (!token) { console.log(cWarn(" WARN ") + " failed to connect"); setTimeout(() => { process.exit(0); }, 2000); }
            console.log(cServer('Connection to Discord has been reestablished.'));
		});
	});
});

// Converting time to a readable format
function convertTime(timestamp) {
    if (timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp 
    }
    
    timestamp = new Date().toString()
    return timestamp
    
}

// send new guild information to the new guild channel
function newServer(server, hook, criticalInfo) {
    function convertTime(timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp
    }
    
    // send information to channel about a new server the bot has joined
    hook.send(`\n\n**New Server: ${criticalInfo.name}**\nServer ID: ${criticalInfo.id}\nServer Owner: ${criticalInfo.ownerName}\nServer Owner ID: ${criticalInfo.ownerID}\nHumans: ${criticalInfo.humanCount}\nBots: ${criticalInfo.botCount}\nJoined: ${convertTime(criticalInfo.joined)}`).then(message => console.log(cDebug(`\nSent message:\n${message.content}`))).catch(console.error);
}

// check if a guild's id exist
function checkID(bot, id, location) {
    let servers = bot.guilds;
    
    if (location == 'blacklist') {
        if (banned.blacklist.includes(id)) {
            return true
        } else {
            return false
        }
    } else if (location == 'other') {
        for (let server of servers) {
            if (server.includes(id)) {
                return true
            } else {
                return false
            }
        }
    }
}

// check blacklist with guilds the bot
// has joined and leave any if there's a match
function checkBlacklist(bot, hook) {
    for (let guild of bot.guilds) {
        guild = guild[1];
        let serverName = guild.name,
        serverID = guild.id,
        ownerID = guild.ownerID;
        
        if (banned.blacklist.includes(serverID)) {
            guild.leave();
            return hook.send(`Removed Guild: ${serverName}!`).then(message => console.log(cDebug(`Sent message:\n${message.content}`))).catch(console.error);
        }
    }
}

// translating bot uptime
function botUptime(milliseconds) {
    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'just now';
}

// check if word submitted exists in the dictionary
function checkWord(sorrows, w) {
    var l = '';
    var word = w;
    var last = sorrows.length - 1;
    
    for (const sorrow of sorrows) {
        w = w.toUpperCase();
        l = sorrow.title;
        l = l.toUpperCase();

        if( word == sorrow.title || w == l ) {
            return true
        }
    }

    if (sorrows[last].title !== w) {
        return false
    }
}
    
// find and return one word with all information
function singleWord(sorrows, w) {
    var word = w;
    var l = '';

    for (let sorrow of sorrows) {
        w = w.toUpperCase();
        l = sorrow.title.toUpperCase();

        if (word == sorrow.title || w == l) {
            return sorrow
        }
    }
}

// find all words and return only their name
function displayWords(sorrows) {
    var lexicon = ``;
    let i = 1;
    let j = 0;
    
    // init array
    var wordList = [];
    
    // adding words into array
    for (const sorrow of sorrows) {
        wordList.push(sorrow.title.toLocaleLowerCase());
    }
    
    // sorting alphabetically
    wordList.sort();
    
    // adding numbers for each word
    for (const word of wordList) {
        if (j !== (wordList.length - 1)) {
            lexicon += `${i}. ${word}\n`;
            j++
            i++
        } else {
            lexicon += `${i}. ${word}`;
        }
    }
    
    // display complete list when function is called
    return lexicon
}