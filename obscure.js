'use strict';

const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

const sorrows = require('./words.json');

const prefix = config.prefix;
const about = config.about;
const owner = config.ownerID;

// use require() for future references
bot.on('ready', () => {
    console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    var rn = Math.floor(Math.random() * (sorrows.length - 1));
    
    let args = message.content.split(" ").slice(1);
    
    var path = './commands/';
    
    try {
        let commandFile = require(`${path}${command}.js`);
        commandFile.run(bot, message, args, owner, sorrows, rn, about, prefix, displayWords, checkWord, singleWord);
    } catch (err) {
        // if the command is invalid
        message.reply(`\`${command}\` is not a valid command. Check \`!help\` for a list of commands.`);
        console.error(err);
    }
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));

bot.login(config.token);

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

    for (const sorrow of sorrows) {
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