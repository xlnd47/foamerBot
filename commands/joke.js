const Discord = require("discord.js");
const request = require("request");
const querystring = require("querystring");
const config = require("../config.json");
let rapidApi;

module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete();

  let sql2 = `select value from config where name = "rapidApi"`;
  con.query(sql2, function(err, result) {
    if (err) console.log(err);
    rapidApi = result[0].value;

    let options = {
      method: "GET",
      url: "https://jokeapi.p.rapidapi.com/category/Any",
      qs: { format: "json" },
      headers: {
        "x-rapidapi-host": "jokeapi.p.rapidapi.com",
        "x-rapidapi-key": rapidApi
      }
    };
    request(options, async function(error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      let result = await JSON.parse(body);

      if (result.type == "twopart") {
        message.reply(result.setup).then(msg => {
          setTimeout(function() {
            message.reply(result.delivery);
          }, 3000);
        });
      } else {
        message.reply(result.joke);
      }
    });
  });
};
//name this whatever the command name is.
module.exports.help = {
  name: "joke",
  description: "Makes the bot tell a joke to you",
  usage: `${config.prefix}joke`
};
