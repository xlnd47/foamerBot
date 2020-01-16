const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete()
  return message.reply(`zoek het zelf uit.`).then(m => m.delete(10000))
}
//name this whatever the command name is.
module.exports.help = {
  name: "help",
  description: "help"

}
