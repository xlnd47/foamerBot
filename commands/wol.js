const Discord = require('discord.js');
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require("request");



module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
    await message.delete()
    request({
        uri: "https://wol.gg/stats/euw/thefoamer/",
      }, function(error, response, body) {
        console.log(body);
      });


}
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description: "wol"

}