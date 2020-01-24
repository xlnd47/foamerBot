const Discord = require('discord.js');
const url = require('url');



module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
    await message.delete()
    var adr = "https://wol.gg/stats/euw/thefoamer/";
    
    var q = url.parse(adr, true);

    console.log(q);


  console.log(dom);
}
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description: "wol"

}
