const Discord = require('discord.js')
const config = require("../config.json")

module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete()
  
  //check voor username ingegeven
  if (args[0] == undefined){
      return message.reply("Geef mij username bru").then(m => m.delete(10000))
  }
  var user = await message.mentions.users.first()
  if (user == undefined){
      return message.reply("Dit is geen user, bru").then(m => m.delete(10000))
  }
  
  getUserInfo(user, bot, message)
}


function getUserInfo(user, bot, message){

  //hier uw code tunahan!!
  var createdDate = user.createdAt
  var dateToday = new Date()

  var daysOld = (dateToday.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)


  const embed = new Discord.RichEmbed()
    .setTitle("Info voor " + user.tag)
    .setAuthor(user.tag, user.displayAvatarURL)
    /*
    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    */
    .setColor(0x00AE86)
    .addField("Creation Date", createdDate)
    .addField("Days old", Math.floor(daysOld))
    .setFooter("Tunahan is echt een boer ojooo")

    // .setImage("http://i.imgur.com/yVpymuV.png")
    // .setThumbnail("http://i.imgur.com/p2qNFag.png")
    // /*
    // * Takes a Date object, defaults to current date.
    // */
    // .setTimestamp()
    // .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
     
    // /*
    // * Inline fields may not display as inline if the thumbnail and/or image is too big.
    // */
    // .addField("Inline Field", "They can also be inline.", true)
    // /*
    // * Blank field, useful to create some space.
    // */
    // .addBlankField(true)
    // .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
 
    message.reply(embed);



}




//name this whatever the command name is.
module.exports.help = {
  name: "userinfo",
  description: "Gives info about the @mention"

}
