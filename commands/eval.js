const Discord = require('discord.js');
const config = require("../config.json");
var adminId;

module.exports.run = async (bot, message, args, con) => {

    var sql = `select value from config where name = "adminId"`;
    con.query(sql, function (err, result) {
        if (err) return message.reply('Probleem met database connectie');
        adminId = result[0].value
      

        if (!message.member.roles.has(adminId)){
            return message.reply("Don't try me bru").then(m => m.delete(10000))
        }
        try {
            const code = args.join(" ");
            let evaled = eval(code);
    
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
    
            message.channel.send(clean(evaled), {code:"xl"});
        } 
        catch (err) {
            bot.channels.get(config.logChannelId).send(err)

            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    });

   


}

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
//name this whatever the command name is.
module.exports.help = {
  name: "eval",
  description: "Evaluation command, only for developers"

}
