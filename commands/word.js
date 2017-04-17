exports.run = (bot, message, args, about, prefix, rn, sorrows, displayWords, checkWord, singleWord) => {
    const wordCount = message.content.split("word ").length;
    const words = message.content.split("word ");
    var w = '';
    
    words.shift();
    words.forEach(function(item, index, array) {
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
        return message.channel.sendMessage(`\`${w}\` is not a valid word. Use the command \`dictionary\` for a complete list of words.`)
    } else {
        let sw = singleWord(sorrows, w);
        w = w.toLowerCase();
        
        message.channel.sendEmbed({
            color: 0x23BDE7,
            title: `${w} - ${sw.speech}`,
            description: `\`\`\`${sw.desc}\`\`\``,

            // optional
            // timestamp: new Date(),

            footer: {
                icon_url: sw.authorPic,
                text: sw.author
            }
        });
        if (sw.video != null) {
            message.channel.sendMessage(sw.video);
        }   
    }
}
