exports.run = (bot, message, args, serverSorrows, about, guildConf) => {
    let configKeys = "";
    
    Object.keys(guildConf).forEach(key => {
        configKeys += `${key}  :  ${guildConf[key]}\n`;
    });
    
    message.channel.send(`The following are the server's current configuration: \`\`\`${configKeys}\`\`\``);
}
