const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    if (args[0].length < 1)
            return message.reply(`gimme link bru, prefer youtube link`);

    let sql = `insert into playlist(url, guildId, userId, played) values("${args[0]}", "${message.member.id}", "${message.guild.id}, 0")`;
    con.query(sql, (err, rows) => {
        message.reply(`tis toegevoegd bru`);
        console.log(err);
    });
}
//name this whatever the command name is.
module.exports.help = {
  name: "add",
  description: "add songs"

}
