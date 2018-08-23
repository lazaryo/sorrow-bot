exports.run = (bot, message, args, serverSorrows, about, guildConf) => {
    const adminRole = message.guild.roles.find("name", guildConf.adminRole);
    if(!adminRole) return message.reply("Administrator Role Not Found");
    
    // if the user is not admin
    if(!message.member.roles.has(adminRole.id)) return message.reply("You're not an admin, sorry!")
    
    // Let's get our key and value from the arguments. This is array destructuring, by the way. 
    const [key, ...value] = args;
    // Example: 
    // key: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)
    
    // check if the key exists in the config
    if(!bot.settings.has(message.guild.id, key))  return message.reply("This key is not in the configuration.");
    
    // Set the prefix value back to it's default value if empty
    // need to reset each key if something similar happens
    if (value.join(" ") == "" && key == 'prefix') return bot.settings.set(message.guild.id, `${bot.user}`, key);
    bot.settings.set(message.guild.id, value.join(" "), key);
    
    message.channel.send(`Guild configuration item ${key} has been changed to:\n\`${value.join(" ")}\``);
}
