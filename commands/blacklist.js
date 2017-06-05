exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, banned, checkID, fs, newGuildHook, blacklistHook, safe) => {
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    const messageCount = message.content.split(` `).length;
    let serverID = message.content.split(` `);
    
    if (message.author.id !== "303105492572569600") {
        return message.channel.send('You don\'t have permission you :chicken:!');
    }
    if (currentGuildID != '299853081578045440') {
        return message.channel.send('Not in this server!');
    }
        
    if (messageCount != 3) {
        return message.channel.send('Brother man, you need to add a Guild ID for blacklisting.');
    } else {
        serverID.shift();
        serverID.shift();
        gID = serverID[0];
        
        if (banned.blacklist.includes(gID) == true) {
            return message.channel.send('This server has already been blacklisted.');
        }
        
        if (checkID(bot, gID, 'other') == false) {
            return message.channel.send('This ID does not match any of the guilds I\'ve joined.');
        } else {
            if (safe.whitelist.includes(gID)) {
                return message.channel.send('Brother man, I\'d rather not leave this server.');
            } else {
                for (let guild of bot.guilds) {
                    let criticalInfo = {
                        "name": guild[1].name,
                        "id": guild[1].id,
                        "ownerName": guild[1].owner.displayName,
                        "ownerID": guild[1].owner.id,
                        "memberCount": guild[1].members.size,
                        "botCount": guild[1].members.filter(m => m.user.bot).size,
                        "humanCount": guild[1].members.filter(m => !m.user.bot).size
                    }
                    
                    if (guild[1].includes(gID)) {
                        banned.blacklist.push(criticalInfo.id);
                        fs.writeFile("./banned.json", JSON.stringify(banned, "", "\t"), err => {
                            guild[1].defaultChannel.send("Of all the different ways we reassure ourselves, the least comforting is this: \"it's already too late.\"");
                            bot.users.get("266000833676705792").send("**Bot Farm blacklisted:** " + criticalInfo.name + " (" + criticalInfo.id + ")\n" + (err ? "Failed to update database" : "Database updated."))
                        })
                        
                       return guild.leave();
                    }
                }
            }
        }
    }
}
