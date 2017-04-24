exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: 'Obscure Sorrows',
        description: about.origin,
        fields: [
            {
                name: 'The Bot',
                value: about.bot,
                inline: false
            },
            {
                name: 'Owner',
                value: about.owner,
                inline: true
            },
            {
                name: 'Links',
                value: 'Author: [John Koenig](https://twitter.com/ObscureSorrows/)\n[Dictionary Website](http://dictionaryofobscuresorrows.com)',
                inline: true
            },
            {
                name: 'Videos',
                value: '[Introduction to Series](https://www.youtube.com/watch?v=hEDWHQr2Wjw)\n[Series Announcement](https://vimeo.com/97890190)',
                inline: true
            },
            {
                name: 'Uptime',
                value: botUptime(bot.uptime),
                inline: true
            },
            {
                name: 'Library',
                value: '[Discord.js](https://discord.js.org/)',
                inline: true
            },
            {
                name: 'Invite',
                value: '[Link](https://discordapp.com/oauth2/authorize?client_id=299851881746923520&scope=bot&permissions=523328)',
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
            }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    });
    
    var parts = [
        {
            name: 'Guild Count',
            value: bot.guilds.size,
            inline: true
        },
        {
            name: 'Current Guild',
            value: message.guild.name,
            inline: true
        },
        {
            name: 'Current Guild Bot Count',
            value: message.guild.members.filter(m => m.user.bot).size,
            inline: true
        },
        {
            name: 'Guilds',
            value: 'List of all guilds and their info is below',
            inline: false
        }
    ];
    
    function convertTime(timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp
    }
    
    // Get Info from all Guilds the bot is in
    function guildList(fields) {
        let i = 1;
        
        for (let n of bot.guilds) {
            let args = {
                name: '',
                value: '',
                inline: false
            }
            
            args.name = `Guild ${i}`;
            args.value = `Name: ${n[1].name}\nServer ID: ${n[1].id}\nOwner ID: ${n[1].ownerID}\nHuman Size: ${n[1].members.filter(m => !m.user.bot).size}\nBot Size: ${n[1].members.filter(m => m.user.bot).size}\nJoined: ${convertTime(n[1].joinedTimestamp)}`;
            
            fields.push(args);
            i++
        }
        return fields
    }
    
    if (message.author.id == "303105492572569600") {
        return message.author.sendEmbed({
            color: 0x23BDE7,
            fields: guildList(parts)
        });
    }
}