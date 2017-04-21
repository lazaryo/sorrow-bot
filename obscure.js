'use strict';

const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

const sorrows = require('./words.json');
const about = config.about;
const prefix = '<@299851881746923520>';

// My Guild ID: 299853081578045440
// Bot ID: 299853081578045440

// use require() for future references
bot.on('ready', () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on("message", (message) => {
    if (message.author.id == about.ownerID) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    let command = message.content.split(" ")[1];

    var rn = Math.floor(Math.random() * (sorrows.length - 1));
    
    let args = message.content.split(" ").slice(2);
    
    var path = './commands/';
    
    try {
        let commandFile = require(`${path}${command}.js`);
        commandFile.run(bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime);
    } catch (err) {
        // if the command is invalid
        // console.error(err);
        console.log(`From Guild: ${message.guild.name}`);
        console.log(`Author Username: ${message.author.username}`);
        console.log(`Author ID: ${message.author.id}`);
    }
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));

bot.login(config.token);

bot.setInterval(function(){getStats(bot)}, 60000);
//bot.setInterval(function(){getStats(bot)}, 3600000);

function getStats(bot) {
    console.log('Guilds: ' + bot.guilds.size);
    console.log('Channels: ' + bot.channels.size);
    console.log('Users: ' + bot.users.size);
}

function botUptime(milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

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