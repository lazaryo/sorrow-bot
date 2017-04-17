exports.run = (bot, message, args, about) => {
    if (message.author.id !== about.ownerID) {
        return message.sendMessage('You don\'t have permission you :chicken:!');
    }
    
    if(!args || args.size < 1) return message.channel.sendMessage(`Must provide a command name to reload.`);
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.sendMessage(`The command \`${args[0]}\` has been reloaded.`);
};