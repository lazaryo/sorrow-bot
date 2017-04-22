'use strict';

//const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

const sorrows = require('./words.json');
const about = config.about;
const prefix = '<@299851881746923520>';

// use require() for future references
bot.on('ready', () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

// response when messages are sent in a channel
bot.on("message", (message) => {
    if (message.author.id == about.ownerID) return;
    if (message.author.bot) return;
    
    if (message.channel.type == 'dm') {
        message.author.sendMessage('I don\'t work within Direct Messages. Use one of the commands below within a text channel.');
        return message.author.sendEmbed({
            color: 0x23BDE7,
            title: 'My Commands',
            description: '`sorrow`, `word`, `dictionary`, `info`, `help`',
            fields: [{
                name: 'Prefix',
                value: `${bot.user}`
            }]
        }).catch(error => console.log(error));
    };
    
    if (!message.content.startsWith(prefix)) return;

    if (message.channel.type !== 'text') {
        message.author.sendMessage('I don\'t work within Direct Messages. Use one of the commands below within a text channel.');
        return message.author.sendEmbed({
            color: 0x23BDE7,
            title: 'My Commands',
            description: '`sorrow`, `word`, `dictionary`, `info`, `help`',
            fields: [{
                name: 'Prefix',
                value: `${bot.user}`
            }]
        }).catch(error => console.log(error));
    };
    
    var botCount = message.guild.members.filter(m => m.user.bot).size;
    var humanCount = message.guild.members.filter(m => !m.user.bot).size;
    var server = message.guild;
    
    if(botCount > humanCount) {
        message.channel.sendMessage('I can\'t stay here.');
        server.leave();
        console.log(`Bots: ${botCount}`);
        console.log(`Humans: ${humanCount}`);
        return console.log(`I left the server: ${server.name} because there are too many bots.`);
    }
    
    let command = message.content.split(" ")[1];

    var rn = Math.floor(Math.random() * (sorrows.length - 1));
    
    let args = message.content.split(" ").slice(2);
    
    var path = './commands/';
    
    try {
        let commandFile = require(`${path}${command}.js`);
        commandFile.run(bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime);
    } catch (err) {
        // if the command is invalid
        console.error(err);
        console.log(`From Guild: ${message.guild.name}`);
        console.log(`Author Username: ${message.author.username}`);
        console.log(`Author ID: ${message.author.id}`);
    }
});

// When the bot joins a new server
bot.on("guildCreate", server => {
    let serverOwner = server.owner;
    serverOwner.sendMessage('Thanks for adding me. Below are the commands that you can use with me.');
    serverOwner.sendEmbed({
        color: 0x23BDE7,
        title: 'My Commands',
        description: '`sorrow`, `word`, `dictionary`, `info`, `help`',
        fields: [{
            name: 'Prefix',
            value: `${bot.user}`
        }]
    });
    
    var botCount = server.members.filter(m => m.user.bot).size;
    var humanCount = server.members.filter(m => !m.user.bot).size;
    
    if(botCount > humanCount) {
        serverOwner.sendMessage('I can\'t stay here.');
        server.leave();
        console.log(`I left the server: ${server.name} because there are too many bots.`);
    }
});

// Error stuff
bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));

// Bot logging online
bot.login(config.token);

// Display Stats every hour
bot.setInterval(function() {
    getStats(bot)
}, 3600000);

// Logging the Stats function
function getStats(bot) {
    console.log('Guilds: ' + bot.guilds.size);
    console.log('Channels: ' + bot.channels.size);
    console.log('Users: ' + bot.users.size);
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

        if( word == sorrow.title || w == l ) {
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