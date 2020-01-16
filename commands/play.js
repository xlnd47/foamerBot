const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes

    // if (args[0].length < 1)
    //     return message.reply(`gimme link bru, prefer youtube link`);

    console.log(message.member);
    // console.log(message.user);


}
//name this whatever the command name is.
module.exports.help = {
  name: "play",
  description: "play"

}
