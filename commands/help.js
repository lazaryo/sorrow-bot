exports.run = (bot, message, args, owner, sorrows, rn, about, prefix) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: 'Obscure Sorrows Bot Commands',
        description: '`sorrow`, `word`, `dictionary`, `about`, `help`',
        fields: [{
            name: 'Prefix',
            value: prefix
        }],
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    });
}