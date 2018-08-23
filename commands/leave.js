exports.run = (bot, message) => {
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    const messageCount = message.content.split(` `).length;
    let serverID = message.content.split(` `)[2];
    
    if (message.author.id !== "303105492572569600") {
        return message.channel.send('You don\'t have permission you :chicken:!');
    }
    if (currentGuildID != '299853081578045440') {
        return message.channel.send('Not in this server!');
    }
    
    if (messageCount != 3) {
        return message.channel.send('Brother man, you need to add a Guild ID for me to leave.');
    } else {
        for (let guild of bot.guilds) {
            if (guild.includes(serverID)) {
                message.channel.send(`I have left the guild: \`${guild[1].name}\``);
                return guild[1].leave();
            }
        }
    }
}
