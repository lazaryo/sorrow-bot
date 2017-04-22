exports.run = (bot, message) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: 'Obscure Sorrows Bot Commands',
        description: '`sorrow`, `word`, `dictionary`, `info`, `help`',
        fields: [{
            name: 'Prefix',
            value: `${bot.user}`
        }],
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    });
}
