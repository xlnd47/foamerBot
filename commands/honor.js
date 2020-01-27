const Discord = require('discord.js')

module.exports.run = async (bot, message, args, con) => {
    //this is where the actual code for the command goes
    await message.delete()
    //return message.reply("Hi, Tunahan is een meisje").then(m => m.delete(10000))


    if (args[0] == undefined){
        getTopList(message);
    }else {
        honorPerson(message);
    }

}

function getTopList(){
    message.reply("nog nie geimplementeerd bruh")
}

function honorPerson(message){

    var user = await message.mentions.users.first();
    if (user == undefined){
        return message.reply("fck u bruh");
    }


    let sql = `select honor from reputation where name = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        //console.log(result[0].value);
        if (result < 1){
            createUser(user);
        }else {
            honorUser(message, user);
        }

        
    });
}

function honorUser(message, user){
    let sql = `update reputation set honor = honor + 1 where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        //console.log(result[0].value);
        message.reply("deze bruh is gehonored");
    });
}

function createUser(message, user){
    let sql = `insert into reputation values("${user.id}", 1, 0)`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        //console.log(result[0].value);
        message.reply("deze bruh is gehonored");
    });
}






//name this whatever the command name is.
module.exports.help = {
  name: "honor",
  description: "Example"

}
