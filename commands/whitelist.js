exports.run = (bot, message, args, about, rn, sorrows, convertTime, displayWords, checkWord, singleWord, prefix, botUptime, banned, checkID, fs, newGuildHook, blacklistHook, safe) => {
    const currentGuild = message.guild;
    const currentGuildID = message.guild.id;
    const messageCount = message.content.split(` `).length;
    let serverToWhitelist = message.content.split(` `)[2];
    
    if (message.author.id !== "303105492572569600") {
        return message.channel.send('You don\'t have permission you :chicken:!');
    }
    if (currentGuildID != '299853081578045440') {
        return message.channel.send('Not in this server!');
    }
    
    message.channel.send('I have retired this command for now.');
}
        
//    if (messageCount != 3) {
//        return message.channel.send('Brother man, you need to add a Guild ID for blacklisting.');
//    } else {
//        serverID.shift();
//        serverID.shift();
//        serverID = serverID[0];
//
//        if (safe.whitelist.includes(serverID)) {
//            return message.channel.send('This server has already been saved.');
//        }
//        
//        safe.whitelist.push(serverID);
//        fs.writeFile("./safe.json", JSON.stringify(safe, "", "\t"), err => {
//            bot.users.get("266000833676705792").send("**Guild Whitelisted:** " + serverID + "\n" + (err ? "Failed to update database" : "Database updated."));
//            return message.channel.send('This server has been added to the whitelist.');
//        })
//    }
//}
