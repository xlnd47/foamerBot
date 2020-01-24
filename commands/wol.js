const Discord = require('discord.js')
const jsdom = require("jsdom");

module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete()

  var dom = new JSDOM(``, {
    url: "https://wol.gg/stats/euw/thefoamer/",
    referrer: "https://wol.gg/stats/euw/thefoamer/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
  });


  console.log(dom);
}
//name this whatever the command name is.
module.exports.help = {
  name: "wol",
  description: "wol"

}
