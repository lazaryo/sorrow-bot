exports.run = (bot, message, args, about, rn, sorrows, convertTime, displayWords, checkWord, singleWord, prefix, botUptime) => {
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    const currentChannelID = message.channel.id;
    
    if (message.author.id !== "303105492572569600") {
        return message.channel.send('You don\'t have permission you :chicken:!');
    }
    
    if (currentGuildID != '299853081578045440') {
        return message.channel.send('Not in this server!');
    }
    
    if (currentChannelID != '300143870056857600') {
        return message.channel.send('Use this command in the Admin Channel!');
    }
    
    function theList() {
        var parts = [];

        let i = 1;
        for (let n of bot.guilds) {
            let criticalInfo = {
                "name": n[1].name,
                "id": n[1].id,
                "ownerID": n[1].ownerID,
                "memberCount": n[1].members.size,
                "botCount": n[1].members.filter(m => m.user.bot).size,
                "humanCount": n[1].members.filter(m => !m.user.bot).size,
                "joined": convertTime(n[1].joinedTimestamp)
            }
            
            let server = {
                name: criticalInfo.name,
                value: `Server ID: ${criticalInfo.id}\nOwner ID: ${criticalInfo.ownerID}\nHuman Size: ${criticalInfo.humanCount}\nBot Size: ${criticalInfo.botCount}\nJoined: ${criticalInfo.joined}`,
                inline: false
            };

            parts.push(server);
            i++
        }
        return parts;
    }
    
    message.channel.send({
        "embed": {
            color: 0x23BDE7,
            title: 'Guild List',
            description: `Use ${bot.user} \`blacklist (Guild ID)\` to blacklist a Guild from using this bot.\n\nUse ${bot.user} \`whitelist (Guild ID)\` to add a Guild that is safe to use this bot.`,
            fields: theList(),
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.username
            }
        }
    }).catch(error => console.log(error));
    
}

