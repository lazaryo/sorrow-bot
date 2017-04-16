exports.run = (bot, message, args, owner, sorrows, rn) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        //color: randomColor(),
        title: `${sorrows[rn].title} - ${sorrows[rn].speech}`,
        description: `\`\`\`${sorrows[rn].desc}\`\`\``,
            
        // optional
        // timestamp: new Date(),
            
        footer: {
            icon_url: sorrows[rn].authorPic,
            text: sorrows[rn].author
        }
    });
    if (sorrows[rn].video != null) {
        message.channel.sendMessage(sorrows[rn].video);
    }
}