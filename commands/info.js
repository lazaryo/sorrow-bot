exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime) => {
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
                name: 'Owner',
                value: about.owner,
                inline: true
            },
            {
                name: 'Library',
                value: '[Discord.js](https://discord.js.org/)',
                inline: true
            },
            {
                name: 'Invite',
                value: '[Link](https://discordapp.com/oauth2/authorize?client_id=299851881746923520&scope=bot&permissions=31744)',
                inline: true
            },
            {
                name: 'Servers',
                value: bot.guilds.size,
                inline: true
            },
            {
                name: 'Channels',
                value: bot.channels.size,
                inline: true
            },
            {
                name: 'Users',
                value: bot.users.size,
                inline: true
            },
            {
                name: 'Uptime',
                value: botUptime(bot.uptime),
                inline: true
            }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    });
}