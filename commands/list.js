exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, blacklist) => {
    function convertTime(timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp
    }
    
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    const currentChannelID = message.channel.id;
    
    if (message.author.id !== "303105492572569600") {
        return message.TextChannel.send('You don\'t have permission you :chicken:!');
    }
    
    if (currentGuildID != '299853081578045440') {
        return message.channel.sendMessage('Not in this server!');
    }
    
    if (currentChannelID != '300143870056857600') {
        return message.channel.sendMessage('Use this command in the Admin Channel!');
    }
    
    function theList() {
        var parts = [];

        let i = 1;
        for (let n of bot.guilds) {
            let botCount = n[1].members.filter(m => m.user.bot).size;
            let humanCount = n[1].members.filter(m => !m.user.bot).size;
            let guildID = n[1].id;
            let guildName = n[1].name;
            let ownerID = n[1].owner.id;
            let joined = convertTime(n[1].joinedTimestamp);
            
            
            let server = {
                name: guildName,
                value: `Server ID: ${guildID}\nOwner ID: ${ownerID}\nHuman Size: ${humanCount}\nBot Size: ${botCount}\nJoined: ${joined}`,
                inline: false
            };

            parts.push(server);

            for (let bl of blacklist) {
                if (guildID == bl.serverID) {
                    n[i].leave();
                    console.log('I left this guild.');
                }
            }

            i++
        }
        return parts;
    }
    
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: 'Guild List',
        description: `Use ${prefix} \`blacklist (Guild ID)\` to blacklist a Guild from using this bot.`,
        fields: theList(),
        timestamp: new Date(),
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    }).catch(error => console.log(error));
    
}

