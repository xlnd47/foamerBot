const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (bot, message, args, con) => {

    let sql = `select x.discordId, x.level, x.xp, r.honor, r.report From foamer.xp x left join foamer.reputation r on x.discordId = r.discordId  where x.discordId = "${message.author.id}"`;
    con.query(sql, (err, result) => { 
        if (result[0] == undefined)
            return  message.reply(`jij heb geen stats, bruh`);

        let xpNeeded = 5 * (result[0].level ^ 2) + 50 * result[0].level + 100;
        //message.reply(`jij ben lvl ${rows[0].level}, heb ${rows[0].xp}/${xpNeeded} xp, bruh`);


        const embed = new Discord.RichEmbed()
        .setTitle(`stats van ${message.author.tag}`)
        .setAuthor(message.author.username, message.author.avatarURL)
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
  name: ["level", "stats", "lvl"],
  description: "Shows your own level and other stats",
  usage: `${config.prefix}level`
}
