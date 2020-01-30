const Discord = require('discord.js')
const config = require("../config.json");

var getYouTubeID = require('get-youtube-id');

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    if (args[0].length < 1)
        return message.reply(`gimme link bru, prefer youtube link`);

    var id = getYouTubeID(args[0]);
    if (id == null)
        return message.reply(`haha rekt, not possible bru`);
 
    let sql = `insert into playlist values("${id}",  "${message.guild.id}", "${message.member.id}", 0, NOW())`;
    con.query(sql, (err, rows) => {
        message.reply(`tis toegevoegd bru`);
        console.log(err);
    });

}
//name this whatever the command name is.
module.exports.help = {
  name: "add",
  description: "NOT IMPLEMENTED",
  usage: `${config.prefix}add SONG_LINK`
}
