exports.run = (bot, message, args, newOne, about, rn, sorrows) => {
    message.channel.send({
            "embed": {
            color: 0x23BDE7,
            title: `${newOne[rn].title} - ${newOne[rn].speech}`,
            description: `\`\`\`${newOne[rn].definition}\`\`\``,
            footer: {
                icon_url: sorrows[rn].authorPic,
                text: sorrows[rn].author
            }
        }
    });
    
    if (newOne[rn].video != null) {
        message.channel.send(newOne[rn].video);
    }
}