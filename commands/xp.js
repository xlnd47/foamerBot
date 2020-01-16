const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    let sql = `select * from xp where discordId = "${message.author.id}"`;

    con.query(sql, (err, rows) => { 
        message.reply(`jij heb ${rows[0].xp} xp, bru`);
    })


}
//name this whatever the command name is.
module.exports.help = {
  name: "xp",
  description: "xp"

}
