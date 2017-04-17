exports.run = (bot, message, args, about, prefix, rn, sorrows, displayWords, checkWord, singleWord) => {
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
                value: `${about.owner} (${about.ownerID})`
            },
            {
                name: 'Library',
                value: '[Discord.js](https://discord.js.org/)'
            },
            {
                name: 'Home Server',
                value: '[Join](https://discord.gg/VT73vPh)'
            },
            {
                name: 'Invite',
                value: '[Link](https://discordapp.com/oauth2/authorize?client_id=299851881746923520&scope=bot&permissions=31744)'
            },
            {
                name: 'Servers',
                value: `\`${bot.guilds.size}\``
            },
            {
                name: 'Channels',
                value: `\`${bot.channels.size}\``
            },
            {
                name: 'Users',
                value: `\`${bot.users.size}\``
            },
            {
                name: 'Lastest Guild',
                value: `\`${bot.guilds.first()}\``
            }
//            ,
//            {
//                name: 'Uptime',
//                value: `\`${bot.uptime}\``
//            }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    });
}