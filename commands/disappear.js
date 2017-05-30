/* For use to leave guilds that are bot farming */
/* checking the blacklist.json file */
exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, banned) => {
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
    let i = 1;
    for (let server of banned) {
        for (let guild of bot.guilds) {
            guild = guild[1];
            if (server.serverID == guild.id) {
                guild.leave();
            }
        }
        i++
    }
    message.reply('I\'ve been cleansed of the evil guilds.');
}
