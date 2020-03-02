const Discord = require("discord.js");
const mysql = require("mysql");
const ytdl = require(`ytdl-core`);
const config = require("../config.json");
let con;

module.exports.run = async (bot, message, args, conn) => {
  //console.log(message.member);
  // console.log(message.user);
  con = conn;

  const voiceChannel = message.member.voiceChannel;
  let connection;
  if (message.member.voiceChannel) {
    let voice = message.member.voiceChannel.join().then(connections => {
      connection = connections;
    });
  } else {
    return message.reply("bruh, ga in voice channel bruh");
  }
  const serverQueue = message.guild.id;

  try {
    let sql = `select * from playlist where guildId = "${message.guild.id}" and played = 0`;
    con.query(sql, function(err, result) {
      console.log(result);
      if (result.length < 1) return message.reply(`niks in queue, bruh`);
      let firstSong = result[0];

      console.log(firstSong);

      const dispatcher = connection
        .playStream(
          ytdl(`https://www.youtube.com/watch?v=${firstSong.urlId}`, {
            filter: `audioonly`,
            quality: `highestaudio`
          })
        )
        .on("end", () => {
          console.log("Music ended!");
        })
        .on("error", error => {
          console.error(error);
        });

      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    });
  } catch (e) {
    console.log(e);
  }
};
//name this whatever the command name is.
module.exports.help = {
  name: "play",
  description: "",
  usage: `${config.prefix}play SONG_LINK`
};
