/* For use to leave guilds that are bot farming */
/* checking the blacklist.json file */
exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, blacklist) => {
    // converting the guild joined time to a more readable format
    function convertTime(timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp
    }
    
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    
    if (message.author.id !== "303105492572569600") {
        return message.TextChannel.send('You don\'t have permission you :chicken:!');
    }
    
    if (currentGuildID != '299853081578045440') {
        return message.TextChannel.send('Not in this server!');
    }
    
    // Guilds to leave because they are naughty
    console.log(`\n\nBlacklisted Guilds\n`);
    let i = 1;
    for (let server of blacklist) {
        if (i == 1) {
            console.log(`Guild ${i}`);
        } else {
            console.log(`\nGuild ${i}`);
        }
        console.log(`Guild ID: ${server.serverID}`);
        console.log(`Owner ID: ${server.ownerID}`);
        
        for (let guild of bot.guilds) {
            if (server.serverID == guild.id) {
                guild.leave();
            }
        }
        i++
    }
}
