const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con, help) => {
  //this is where the actual code for the command goes
  await message.delete();
  return message.reply(`Bahahahaha ez: ${JSON.stringify(help)}.`);
}
//name this whatever the command name is.
module.exports.help = {
  name: "help",
  description: "help"

}
