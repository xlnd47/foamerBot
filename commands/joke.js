const Discord = require('discord.js');
const request = require('request');
const querystring = require('querystring');
var rapidApi;

module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete()


  var sql2 = `select value from config where name = "rapidApi"`;
  con.query(sql2, function (err, result) {
      if (err) console.log(err);
      rapidApi = result[0].value;

      var options = {
          method: 'GET',
          url: 'https://jokeapi.p.rapidapi.com/category/dark',
          qs: {format: 'json'},
          headers: {
            'x-rapidapi-host': 'jokeapi.p.rapidapi.com',
            'x-rapidapi-key': rapidApi
          }
        };
      request(options, async function (error, response, body) {
          if (error) throw new Error(error);
          
          console.log(body);
          var result = await JSON.parse(body)
          

          message.reply(result.setup).then(msg => {
              setTimeout(function(){
                  message.reply(result.delivery);
               }, 3000);
              
          })
      });
  });


}
//name this whatever the command name is.
module.exports.help = {
  name: "joke",
  description: "joke"

}
