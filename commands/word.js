exports.run = (bot, message, args, serverSorrows, about, guildConf, rn, botUptime, banned, safe, checkID, checkWord, convertTime, displayWords, singleWord) => {
    const wordCount = message.content.split(` `).length;
    let words = message.content.split(` `);
    var w = '';
        
    words.shift();
    words.shift();
        
    words.forEach(function(item, index) {
        if (index == (words.length - 1)) {
            w += `${item}`
        } else {
            w += `${item} `
        }
    });
    
    if (w == '' || w == null) {
        w = 'null';
    }
    
    if(checkWord(serverSorrows, w) == false) {
        return message.channel.send(`\`${w}\` is not a valid word. Use the command \`dictionary\` for a complete list of words.`)
    } else {
        let sw = singleWord(serverSorrows, w);
        w = w.toLowerCase();
        
        message.channel.send({
            "embed": {
                color: 0x23BDE7,
                title: `${w} - ${sw.speech}`,
                description: `\`\`\`${sw.definition}\`\`\``,
                footer: {
                    icon_url: sw.authorPicture,
                    text: sw.author
                }
            }
        }).catch(error => console.log(error));
        
        if (sw.video != null) {
            message.channel.send(sw.video);
        }   
    }
}
