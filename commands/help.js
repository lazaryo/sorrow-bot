exports.run = (bot, message, args, serverSorrows, about, guildConf) => {
    message.channel.send({
        "embed": {
            color: 0x23BDE7,
            title: 'Obscure Sorrows Bot Commands',
            description: '`sorrow`, `word`, `dictionary`, `info`, `help`',
            fields: [{
                name: 'Prefix',
                value: guildConf.prefix
            }],
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.username
            }
        }
    });
}
