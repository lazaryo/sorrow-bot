exports.run = (bot, message, args, serverSorrows, about, rn) => {
    message.channel.send({
            "embed": {
            color: 0x23BDE7,
            title: `${serverSorrows[rn].title} - ${serverSorrows[rn].speech}`,
            description: `\`\`\`${serverSorrows[rn].definition}\`\`\``,
            footer: {
                icon_url: serverSorrows[rn].authorPic,
                text: serverSorrows[rn].author
            }
        }
    });
    
    if (serverSorrows[rn].video != null) {
        message.channel.send(serverSorrows[rn].video);
    }
}