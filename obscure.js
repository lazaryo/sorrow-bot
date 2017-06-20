'use strict';

const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

// Create New Guild Webhook
const hooks = config.webhooks;
const newGuildHook = new Discord.WebhookClient(hooks.newGuild.id, hooks.newGuild.token);
const blacklistHook = new Discord.WebhookClient(hooks.blacklist.id, hooks.blacklist.token);
//const botLogHook = new Discord.WebhookClient(hooks.botLog.id, hooks.botLog.token);

const sorrows = require('./words.json');
const banned = require('./banned.json');
const safe = require('./safe.json');
const about = config.about;
const prefix = config.prefix;

// use require() for future references
// just how the commands are set up
bot.on('ready', () => {
    checkBlacklist(bot, blacklistHook);
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

// response when messages are sent in a channel
bot.on("message", (message) => {
    if (message.author.id == about.ownerID) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix.default) || !message.content.startsWith(prefix.nickname)) return;
    if (message.channel.type == 'dm') return;
    if (message.channel.type !== 'text') return;
    
    let command = message.content.split(" ")[1];
    var rn = Math.floor(Math.random() * (sorrows.length - 1));
    let args = message.content.split(" ").slice(2);
    var path = './commands/';
    
    try {
        let commandFile = require(`${path}${command}.js`);
        commandFile.run(bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, banned, checkID, fs, newGuildHook, blacklistHook, safe);
    } catch (err) {
        console.error(err);
        console.log(`From Guild: ${message.guild.name}`);
        console.log(`Guild ID: ${message.guild.id}`);
        console.log(`Owner ID: ${message.guild.owner.id}\n`);
        console.log(`Author Username: ${message.author.username}`);
        console.log(`Author ID: ${message.author.id}`);
    }
});

// When the bot joins a new server
bot.on("guildCreate", server => {
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
            blacklistHook.send("**Bot Farm:** " + criticalInfo.name + " (" + criticalInfo.id + ") tried to add me within their server.").then(message => console.log(`\nSent message:\n${message.content}`)).catch(console.error);
            return server.leave();
        } else {
            banned.blacklist.push(criticalInfo.id);
            fs.writeFile("./banned.json", JSON.stringify(banned, "", "\t"), err => {
                bot.users.get("266000833676705792").send("**Bot Farm blacklisted:** " + criticalInfo.name + " (" + criticalInfo.id + ")\n" + (err ? "Failed to update database" : "Database updated."))
            }) 
            server.defaultChannel.send("Of all the different ways we reassure ourselves, the least comforting is this: \"It's already too late.\"");
            return server.leave();
        }
    }
    
    newServer(server, newGuildHook, criticalInfo);
    
    // Welcome message with a list of commands will be sent to the default channel when joining the guild
    server.defaultChannel.send('Thanks for adding me. Below are the commands that you can use with me.');
    server.defaultChannel.send({
        "embed": {
            color: 0x23BDE7,
            title: 'My Commands',
            description: '`sorrow`, `word`, `dictionary`, `info`, `help`',
            fields: [{
                name: 'Prefix',
                value: `${bot.user}`
            }]
        }
    }).catch(error => console.log(error));
});

// Error stuff
bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));

// Bot logging online
bot.login(config.token);

// Checking if a Blacklisted Guild is connected to the bot and leave
// checking every 30 seconds
//bot.setInterval(function() {
//    checkBlacklist(bot, blacklistHook);
//}, 30000);

// send new guild information to the new guild channel
function newServer(server, hook, criticalInfo) {
    function convertTime(timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp
    }
    
    // send information to channel about a new server the bot has joined
    hook.send(`\n\n**New Server: ${criticalInfo.name}**\nServer ID: ${criticalInfo.id}\nServer Owner: ${criticalInfo.ownerName}\nServer Owner ID: ${criticalInfo.ownerID}\nHumans: ${criticalInfo.humanCount}\nBots: ${criticalInfo.botCount}\nJoined: ${convertTime(criticalInfo.joined)}`).then(message => console.log(`\nSent message:\n${message.content}`)).catch(console.error);
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
            guild.defaultChannel.send("Of all the different ways we reassure ourselves, the least comforting is this: \"It's already too late.\"");
            guild.leave();
            return hook.send(`Removed Guild: ${serverName}!`).then(message => console.log(`Sent message:\n${message.content}`)).catch(console.error);
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