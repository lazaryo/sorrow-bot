exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, blacklist, checkID, fs, newGuildHook, blacklistHook) => {
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    const messageCount = message.content.split(` `).length;
    let serverID = message.content.split(` `);
    
    if (message.author.id !== "303105492572569600") {
        return message.channel.sendMessage('You don\'t have permission you :chicken:!');
    }
    if (currentGuildID != '299853081578045440') {
        return message.channel.sendMessage('Not in this server!');
    }
        
    if (messageCount != 3) {
        return message.channel.sendMessage('Brother man, you need to add a Guild ID for blacklisting.');
    } else {
        serverID.shift();
        serverID.shift();
        
        if (checkID(serverID, bot) == false) {
            message.channel.sendMessage('This ID does not match any of the guilds I\'ve joined.');
        } else {
            if (serverID == '299853081578045440' || serverID == '110373943822540800') {
                return message.channel.sendMessage('Brother man, I\'d rather not leave this server.');
            } else {
                
                let guildName;
                for (let guild of bot.guilds) {
                    guild = guild[1];
                    let ownerID = guild.owner.id;
                    
                    if (serverID == guild.id) {
                        guildName = guild.name;
                        
                        blacklist.evils.push({serverID: Number(serverID), ownerID: Number(ownerID)});
                        fs.writeFile('blacklist.json', JSON.stringify(blacklist, null, 4), function (response) {
                            if (response != null) {
                                blacklistHook.send(`${guildName} has been added to the blacklist.`);
                            } else {
                                console.log(response);
                            }
                        });
                        
                        guild.leave();
                        return message.channel.sendMessage(`I have left the guild ${guildName} and can no loger be apart of the guild anymore.`);
                    }
                }
            }
        }
    }
}
