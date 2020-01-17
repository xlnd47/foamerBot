const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
        
    var user = await message.mentions.users.first();
    if (user != undefined)
        return message.reply(`dit is geen bruh, bruh`);


    //this is where the actual code for the command goes
    let sql = `select * from xp where discordId = "${user.id}"`;

    con.query(sql, (err, rows) => { 
        if (rows[0] == undefined)
            return  message.reply(`bruh, deze bruh heeft geen xp, bruh`);
        message.reply(`deze bruh is lvl ${rows[0].level} en heef ${rows[0].xp} xp, bruh`);
    })
}
//name this whatever the command name is.
module.exports.help = {
  name: "bruh",
  description: "bruh"
}
