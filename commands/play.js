const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes

    // if (args[0].length < 1)
    //     return message.reply(`gimme link bru, prefer youtube link`);

    console.log(message.member.voiceChannel);

}
//name this whatever the command name is.
module.exports.help = {
  name: "example",
  description: "Example"

}

async function play(connection, url) {
    connection.play(await ytdl(url), { type: 'opus' });
}
