exports.run = (bot, message, args, about) => {
    if (message.author.id !== "303105492572569600") {
        return message.channel.sendMessage('You don\'t have permission you :chicken:!');
    }
    
    function leaveGuild(id) {
        for (let n of bot.guilds) {
            if (n[1].id == id) {
                if (n[1].id !== message.guild.id) {
                    message.channel.sendMessage('Leaving guild.');
                    return n.leave().catch(error => console.log(error));;
                } else {
                    return message.channel.sendMessage('Not leaving this guild while you\'re using me.');
                }
            }
        }
    }
    
    let serverID = message.content.split(` `);
    serverID = serverID[2];
    
    if (!serverID) {
        message.channel.sendMessage('Please add the ID of a server that I need to leave. Use command `info` to get a list of all the guilds I\'ve joined.');
    }
    
    leaveGuild(serverID);    
};