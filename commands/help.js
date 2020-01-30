const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con, help) => {
  //this is where the actual code for the command goes
  await message.delete();
  //return message.reply(`Bahahahaha ez: ${JSON.stringify(help)}.`);

  if (args[0] == undefined)
  {
    getAllHelpCommands(help);
  } 
  else 
  {
    getHelpForSingeCommand(help, args[0]);
  }


}

async function getAllHelpCommands(help) {
  const embed = new Discord.RichEmbed()
    .setTitle("All Available Commands")
    .setColor(0x00AE86);

  help.forEach(c => {
    embed.addField(c['prefix'], c['description']);
  });

  embed.setFooter("Tunahan is echt een boer ojooo");

  return message.reply(embed);
}

async function getHelpForSingeCommand(help, command) {
  let exists = false;
  let index = 0;

  help.forEach((c, i) => {
    if(c["prefix"] === command) {
      exists = true;
      index = i;
      break;
    }
  });

  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setFooter("Tunahan is echt een boer ojooo");;

  if (!exists) {
    embed.setTitle("Command does not exist bruh");
    return message.reply(embed);
  } else {
    embed.setTitle(`Help for the '${command}' command`)
    .addField(help[index]['description']);
  }
}

//name this whatever the command name is.
module.exports.help = {
  name: "help",
  description: "Displays all the commands or help about a single command"

}
