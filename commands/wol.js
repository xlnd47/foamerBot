const Discord = require('discord.js');
var http = require('http');
var url = require('url');
var fs = require('fs');



module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
    await message.delete()
    var adr = "https://wol.gg/stats/euw/thefoamer/";
    
    var q = url.parse(adr, true);

    console.log(q.query);


}
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description: "wol"

}
