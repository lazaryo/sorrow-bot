exports.run = (bot, message, args, about, rn, sorrows, convertTime, displayWords, checkWord, singleWord, prefix) => {
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
    
    if(checkWord(sorrows, w) == false) {
        return message.channel.send(`\`${w}\` is not a valid word. Use the command \`dictionary\` for a complete list of words.`)
    } else {
        let sw = singleWord(sorrows, w);
        w = w.toLowerCase();
        
        message.channel.send({
            "embed": {
                color: 0x23BDE7,
                title: `${w} - ${sw.speech}`,
                description: `\`\`\`${sw.desc}\`\`\``,
                footer: {
                    icon_url: sw.authorPic,
                    text: sw.author
                }
            }
        }).catch(error => console.log(error));
        
        if (sw.video != null) {
            message.channel.send(sw.video);
        }   
    }
}
