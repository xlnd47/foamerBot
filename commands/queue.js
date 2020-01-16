const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var youtubeThumbnail = require('youtube-thumbnail');

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    let sql = `select * from playlist where guildId = "${message.guild.id}" and played = 0  order by dateAdded `;
    console.log(sql);
    con.query(sql, (err, rows) => {
        //console.log(err);
        //console.log(rows);

        // rows.forEach(e => {
        //     ytdl.getInfo(e.urlId, (err, info) => {
        //         if (err) throw err;
        //         // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        //         // if (format) {
        //         //   //console.log('Format found!');
        //         // }

        //         console.log(info.title);
        //       });
        // });

        var thumbnail = youtubeThumbnail(`https://www.youtube.com/watch?v=${rows[0].urlId}`);
        console.log(thumbnail.high.url);
        ytdl.getInfo(e.urlId, (err, info) => {
                    if (err) throw err;
                    // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
                    // if (format) {
                    //   //console.log('Format found!');
                    // }
    
                    //console.log(info.title);
                    sendEmbeded(thumbnail.high.url, info.title, message);

                  });
       //message.reply(thumbnail);

    })
}

function sendEmbeded(url, title, message){
    const exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(title)
        .setThumbnail(url)
        .setTimestamp()


    message.reply(exampleEmbed);
}
//name this whatever the command name is.
module.exports.help = {
  name: "queue",
  description: "queue"

}
