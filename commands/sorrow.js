exports.run = (bot, message, args, about, prefix, rn, sorrows) => {
    message.channel.sendEmbed({
        color: 0x23BDE7,
        title: `${sorrows[rn].title} - ${sorrows[rn].speech}`,
        description: `\`\`\`${sorrows[rn].desc}\`\`\``,
        footer: {
            icon_url: sorrows[rn].authorPic,
            text: sorrows[rn].author
        }
    });
    if (sorrows[rn].video != null) {
        message.channel.sendMessage(sorrows[rn].video);
    }
}