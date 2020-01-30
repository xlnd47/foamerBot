const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con, help) => {
  //this is where the actual code for the command goes
  await message.delete();
  //return message.reply(`Bahahahaha ez: ${JSON.stringify(help)}.`);

  if (args[0] == undefined)
  {
    getAllHelpCommands(message, help);
  } 
  else 
  {
    getHelpForSingeCommand(message, help, args[0]);
  }


}

async function getAllHelpCommands(message, help) {
  const embed = new Discord.RichEmbed()
    .setTitle("All Available Commands")
    .setColor(0x00AE86);

  help.forEach(c => {
    embed.addField(c['prefix'], c['description']);
  });

  embed.setFooter("Tunahan is echt een boer ojooo");

  return message.reply(embed);
}

async function getHelpForSingeCommand(message, help, command) {
  let exists = false;
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setFooter("Tunahan is echt een boer ojooo");;

  for(let i = 0; i < help.length; i++) {
    if(help[i]['prefix'] === command) {
      exists = true;
      embed.addField(help[i]['description']);
      break;
    } 
    else 
    {
      console.log(`${help['prefix']} en ${command}`)
    }
  }
    
  if (!exists) {
    embed.setTitle("Command does not exist bruh");
    return message.reply(embed).then(m => m.delete(10000));
  } else {
    embed.setTitle(`Help for the '${command}' command`)
    return message.reply(embed);
  }
}

//name this whatever the command name is.
module.exports.help = {
  name: "help",
  description: "Displays all the commands or help about a single command"

}
