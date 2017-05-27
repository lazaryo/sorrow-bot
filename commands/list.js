exports.run = (bot, message, args, about, rn, sorrows, displayWords, checkWord, singleWord, prefix, botUptime, blacklist) => {
    function convertTime(timestamp) {
        timestamp = new Date(timestamp).toString()
        return timestamp
    }
    
    let i = 1;
    for (let n of bot.guilds) {
        console.log(`\n\nGuild ${i}`);
        console.log(`Name: ${n[1].name}`);
        console.log(`Server ID: ${n[1].id}`);
        console.log(`Owner ID: ${n[1].ownerID}`);
        console.log(`Human Size: ${n[1].members.filter(m => !m.user.bot).size}`);
        console.log(`Bot Size: ${n[1].members.filter(m => m.user.bot).size}`);
        console.log(`Joined: ${convertTime(n[1].joinedTimestamp)}`);
        
        let botCount = n[1].members.filter(m => m.user.bot).size;
        let humanCount = n[1].members.filter(m => !m.user.bot).size;
        let guildID = n[1].id;
        
        for (let bl of blacklist) {
            if (guildID == bl.serverID) {
                n[i].leave();
                console.log('I left this guild.');
            }
        }
        i++
    }
}
