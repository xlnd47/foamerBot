const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, con, help) => {
  //this is where the actual code for the command goes
  await message.delete();
  //return message.reply(`Bahahahaha ez: ${JSON.stringify(help)}.`);

  if (args[0] == undefined) {
    getAllHelpCommands(message, help);
  } else {
    getHelpForSingleCommand(message, help, args[0]);
  }
};

async function getAllHelpCommands(message, help) {
  const embed = new Discord.RichEmbed()
    .setTitle("All Available Commands")
    .setColor(0x00ae86);

  help.forEach(c => {
    embed.addField(c["prefix"], c["description"]);
  });

  embed.setFooter("Tunahan is echt een boer ojooo");

  return message.reply(embed);
}

async function getHelpForSingleCommand(message, help, command) {
  let exists = false;
  const embed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setFooter("Tunahan is echt een boer ojooo");

  for (let i = 0; i < help.length; i++) {
    let prefixes = help[i]["prefix"].split(",");

    prefixes.forEach(p => {
      if (p === command) {
        exists = true;
      }
    });

    if (exists) {
      exists = true;
      embed.addField(`Description`, help[i]["description"]);
      embed.addField(`Usage`, help[i]["usage"]);
      break;
    }
  }

  if (!exists) {
    embed.setTitle("Command does not exist bruh");
    return message.reply(embed).then(m => m.delete(10000));
  } else {
    embed.setTitle(`Help for the '${command}' command`);
    return message.reply(embed);
  }
}

//name this whatever the command name is.
module.exports.help = {
  name: "help",
  description:
    "Displays all the commands or more detailed help about a single command",
  usage: `${config.prefix}help  OR  ${config.prefix}help COMMAND_NAME`
};
