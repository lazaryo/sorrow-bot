exports.run = (bot, message, args, owner, sorrows, rn, about) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: 'Obscure Sorrows',
        description: about.origin,
        fields: [
            {
                name: 'The Bot',
                value: about.bot
            },
            {
                name: 'The Owner',
                value: `The Obscure Sorrows Bot is owned by ${about.owner}.`
            }
        ],
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    });
}