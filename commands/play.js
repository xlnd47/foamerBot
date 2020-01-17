const Discord = require('discord.js');
const mysql = require('mysql');
const ytdl = require(`ytdl-core`);
var con;

module.exports.run = async (bot, message, args, conn) => {

    //console.log(message.member);
    // console.log(message.user);
    con = conn; 

    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
      var voice = message.member.voiceChannel.join();
    } else {
      return message.reply('bruh, ga in voice channel bruh');
    }
    const serverQueue = message.guild.id;

    try {
      let sql = `select * from playlist where guildId = "${message.guild.id}" and played = 0"`;
      con.query(sql, function (err, result) {
        console.log(rows);
        if(rows.length < 1)
          return message.reply(`niks in queue, bruh`);
        let firstSong = rows[0];

        console.log(firstSong);

        const dispatcher = serverQueue.connection.playStream(ytdl(`https://www.youtube.com/watch?v=${firstSong.urlId}`, {
          filter: `audioonly`,
          quality: `highestaudio`
        }))
        .on('end', () => {
          console.log('Music ended!');
        })
        .on('error', error => {
          console.error(error);
        });

        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

      });
    }catch(e){
      console.log(e);
    }


}
//name this whatever the command name is.
module.exports.help = {
  name: "play",
  description: "play"

}
