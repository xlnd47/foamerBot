const Discord = require('discord.js');
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require("request");
const cheerio = require('cheerio')



module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
    await message.delete()

    var name = args.join('');
    request({
        uri: `https://wol.gg/stats/euw/${name}/`,
      }, function(error, response, body) {
        var $ = cheerio.load(body.replace(/<!--|-->/g, ''))
        //console.log($('#time-days').text());
        var days = $('#time-days').text();
        var hours = $('#time-hours').text();

        if (days == "" ){
            message.reply(`deze brakka site vindt u nie: https://wol.gg/stats/euw/${name}/`)
        }else {
            message.reply(`${args.join(' ')} wasted ${hours} or ${days} playing lol RANKED`)
        }
      });


}
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description: "wol"

}
