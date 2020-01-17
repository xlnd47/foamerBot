const Discord = require('discord.js');
const mysql = require('mysql');
const ytdl = require(`ytdl-core`);
var con;

module.exports.run = async (bot, message, args, conn) => {

    //console.log(message.member);
    // console.log(message.user);
    con = con; 

    if (message.member.voiceChannel) {
      var voice = message.member.voiceChannel.join();
    } else {
      return message.reply('bruh, ga in voice channel bruh');
    }


    try {
      let sql = `select * from playlist where guildId = "${message.guild.id} and played = 0"`;
      con.query(sql, (err, result) => {
        if(result[0].length < 1)
          return message.reply(`niks in queue, bruh`);

        let firstSong = result[0];
        voice.playStream(ytdl(`https://www.youtube.com/watch?v=${firstSong.urlId}`, {
          filter: `audioonly`,
          quality: `highestaudio`
        }))
        .on('end', () => {
          console.log('Music ended!');
          // Deletes the finished song from the queue
          serverQueue.songs.shift();
          // Calls the play function again with the next song
          play(guild, serverQueue.songs[0]);
        })
         .on('error', error => {
          console.error(error);
         });

      });
    }catch(e){

    }


}
//name this whatever the command name is.
module.exports.help = {
  name: "play",
  description: "play"

}
