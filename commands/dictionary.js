exports.run = (bot, message, args, serverSorrows, about, guildConf, rn, botUptime, banned, safe, checkID, checkWord, convertTime, displayWords, singleWord) => {
    message.author.send({
        "embed": {
            color: 0x23BDE7,
            title: 'Dictionary',
            description: `There are currently \`${serverSorrows.length}\` Obscure Sorrows in the dictionary.\n\nUse ${bot.user} \`word (word)\` for a specific word's information. See the full list below.`,
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.username
            }
        }
    }).catch(error => console.log(error));
    
    // Send the list of words in a separate message because the dictionary can be large.
    message.author.send({
        "embed": {
            color: 0x23BDE7,
            title: 'Full List',
            description: `${displayWords(serverSorrows)}`,
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.username
            }
        }
    }).catch(error => console.log(error));
    
    message.reply('Please check your DMs :eyes:');
}
