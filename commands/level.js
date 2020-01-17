const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    let sql = `select * from xp where discordId = "${message.author.id}"`;

    con.query(sql, (err, rows) => { 
        if (rows[0] == undefined)
            return  message.reply(`jij heb geen xp, bruh`);
        message.reply(`jij ben lvl ${rows[0].level} en heb ${rows[0].xp} xp, bruh`);
    })


}
//name this whatever the command name is.
module.exports.help = {
  name: "level",
  description: "level"

}
