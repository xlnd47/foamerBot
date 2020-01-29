const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
        
    var user = await message.mentions.users.first();
    if (user == undefined)
        return message.reply(`dit is geen bruh, bruh`);


    //this is where the actual code for the command goes
    let sql = `select x.discordId, x.level, x.xp, r.honor, r.report From foamer.xp x left join foamer.reputation r on x.discordId = r.discordId  where x.discordId = "${user.id}"`;

    con.query(sql, (err, result) => { 
        if (result[0] == undefined)
            return  message.reply(`bruh, deze bruh heeft geen xp, bruh`);
        //message.reply(`Deze bruh is lvl ${result[0].level} en heef ${result[0].xp} xp, bruh`);
        

        const embed = new Discord.RichEmbed()
        .setTitle(`stats van ${user.tag}`)
        .setAuthor(user.username, user.avatarURL)
        .setColor('#0099ff')
        .addField("Level", result[0].level, true)
        .addField("XP/Needed", `${result[0].xp}/${xpNeeded}`, true)
        .addBlankField()
        .addField("Honors", result[0].honor, true)
        .addField("Reports", result[0].report, true)
        .setFooter("Boogie is echt een boer ojooo")
        return message.reply(embed);
    })
}
//name this whatever the command name is.
module.exports.help = {
  name: "bruh",
  description: "bruh"
  
}
