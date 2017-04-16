exports.run = (client, message, args, owner) => {
//    let adminRole = message.guild.roles.find('name', 'Admin');
    if (message.author.id !== owner) {
        return message.reply('You don\'t have permission you :chicken:!');
    }
    
    if(!args || args.size < 1) return message.channel.reply(`Must provide a command name to reload.`);
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command \`${args[0]}\` has been reloaded.`);
};