const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    let sql = `select * from playlist where guildId = "${message.guild.id}" and played = 0  order by dateAdded `;
    console.log(sql);
    con.query(sql, (err, rows) => {
        console.log(err);
        console.log(rows);
    })
}
//name this whatever the command name is.
module.exports.help = {
  name: "queue",
  description: "queue"

}
