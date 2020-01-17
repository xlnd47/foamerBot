const Discord = require('discord.js');
const mysql = require('mysql');
const ytdl = require(`ytdl-core`);
var con;

module.exports.run = async (bot, message, args, conn) => {

    //console.log(message.member);
    // console.log(message.user);
    console.log(message.author);
    con = con; 


    // try {
    //   let sql = `select * from playlist where guildId = "${message.guild.id} and played = 0"`;
    //   con.query(sql, (err, result) => {
    //     if(result[0].length < 1)
    //       return message.reply(`niks in queue, bruh`);

    //     let firstSong = result[0];
    //     voice_con.playStream(ytdl(`https://www.youtube.com/watch?v=${firstSong.urlId}`, {
    //       filter: `audioonly`,
    //       quality: `highestaudio`
    //     }))

    //   });
    // }catch(e){

    // }


}
//name this whatever the command name is.
module.exports.help = {
  name: "play",
  description: "play"

}
