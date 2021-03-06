const Discord = require("discord.js");
const config = require("../config.json");
let http = require("http");
let url = require("url");
let fs = require("fs");
let request = require("request");
const cheerio = require("cheerio");

module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete();

  let name = args.join("");
  request(
    {
      uri: `https://wol.gg/stats/euw/${name}/`
    },
    function(error, response, body) {
      let $ = cheerio.load(body.replace(/<!--|-->/g, ""));
      //console.log($('#time-days').text());
      let days = $("#time-days").text();
      let hours = $("#time-hours").text();

      if (days == "") {
        message.reply(
          `deze brakka site vindt u nie: https://wol.gg/stats/euw/${name}/`
        );
      } else {
        message.reply(`${args.join(" ")} wasted ${hours} or ${days} on lol`);
      }
    }
  );
};
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description:
    "Shows how much time someone has wasted on league by providing the Summoner's name",
  usage: `${config.prefix}wol SUMMONERS_NAME`
};
