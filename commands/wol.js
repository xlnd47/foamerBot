const Discord = require('discord.js');
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require("request");
const cheerio = require('cheerio')



module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
    await message.delete()

    var name = args[0];
    request({
        uri: `https://wol.gg/stats/euw/${name}`,
      }, function(error, response, body) {
        var $ = cheerio.load(body.replace(/<!--|-->/g, ''))
        message.reply(`You wasted ${$('#time-days').text()} playing lol...`)
        //console.log($('#time-days').text());
      });


}
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description: "wol"

}
