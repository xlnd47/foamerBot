const Discord = require('discord.js');

module.exports.run = async (bot, message, args, con) => {

    let sql = `select x.discordId, x.level, x.xp, r.honor, r.report From foamer.xp x left join foamer.reputation r on x.discordId = r.discordId  where x.discordId = "${message.author.id}"`;
    con.query(sql, (err, result) => { 
        if (result[0] == undefined)
            return  message.reply(`jij heb geen xp, bruh`);
        
        let xpNeeded = 5 * (result[0].level ^ 2) + 50 * result[0].level + 100;
        //message.reply(`jij ben lvl ${rows[0].level}, heb ${rows[0].xp}/${xpNeeded} xp, bruh`);


        const embed = new Discord.RichEmbed()
        .setTitle(`stats van ${message.author.tag}`)
        .setColor(0x00AE86)
        .addField("Level", result[0].level)
        .addField("XP/Needed", `${result[0].xp}/${xpNeeded}`)
        .addField("Honors", result[0].honor)
        .addField("Reports", result[0].report)
        .setFooter("Tunahan is echt een boer ojooo")
        return message.reply(embed);
    })


}



//name this whatever the command name is.
module.exports.help = {
  name: ["level", "stats", "lvl"],
  description: "level"

}
