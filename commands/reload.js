exports.run = (bot, message, args, about) => {
    if (message.author.id !== "303105492572569600") {
        return message.TextChannel.send('You don\'t have permission you :chicken:!');
    }
    
    if(!args || args.size < 1) return message.TextChannel.send(`You must provide a command name to reload.`);
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.TextChannel.send(`The command \`${args[0]}\` has been reloaded.`);
};