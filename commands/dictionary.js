exports.run = (bot, message, args, about, prefix, rn, sorrows, displayWords, checkWord, singleWord) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: 'Dictionary',
        description: `There are currently \`${sorrows.length}\` Obscure Sorrows in the dictionary.\n\nUse ${prefix} \`word (word)\` for a specific word's information.\n\n**Full List**\n\n${displayWords(sorrows)}`,
        footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        }
    }).catch(error => console.log(error));
}
