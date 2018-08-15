exports.run = (bot, message, args, serverSorrows, about, rn, convertTime, displayWords, checkWord, singleWord, prefix) => {
    message.author.send({
        "embed": {
            color: 0x23BDE7,
            title: 'Dictionary',
            description: `There are currently \`${serverSorrows.length}\` Obscure Sorrows in the dictionary.\n\nUse ${bot.user} \`word (word)\` for a specific word's information.\n\n**Full List**\n\n${displayWords(serverSorrows)}`,
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.username
            }
        }
    }).catch(error => console.log(error));
    
    message.reply('Please check your DMs :eyes:');
}
