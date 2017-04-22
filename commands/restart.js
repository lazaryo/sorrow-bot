exports.run = (bot, message, args, about) => {
    if (message.author.id !== "303105492572569600") {
        return message.channel.sendMessage('You don\'t have permission you :chicken:!');
    }
    function b(value, key, map) {
        console.log(key.guild.name);
    }
    
    function guildList() {
        for (let n of bot.guilds) {
            console.log(n[1].name);
        }
    }
    
    console.log('\nA list of all the guilds I\'ve joined.');
    guildList();
    console.log(`\nCurrent Guild: ${message.guild.name}`);
    
    message.channel.sendMessage('This command is in development.');
    //message.channel.sendMessage(`I'm up and running again!`);
};