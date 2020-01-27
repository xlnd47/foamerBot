const Discord = require('discord.js')
var con;

module.exports.run = async (bot, message, args, conn) => {
    //this is where the actual code for the command goes
    await message.delete()
    //return message.reply("Hi, Tunahan is een meisje").then(m => m.delete(10000))
    con = conn;

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

    var user = message.mentions.users.first();
    //console.log(user.id);
    if (user == undefined){
        return message.reply("fck u bruh");
    }


    let sql = `select honor from reputation where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        //console.log(result[0].value);
        if (result < 1){
            createUser(message, user);
        }else {
            honorUser(message, user);
        }

        
    });
}

function honorUser(message, user){
    let sql = `update reputation set honor = honor + 1 where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        //console.log(result[0].value);
        message.reply("deze bruh is gehonored");
    });
}

function createUser(message, user){
    let sql = `insert into reputation values("${user.id}", 1, 0)`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        //console.log(result[0].value);
        message.reply("deze bruh is gehonored");
    });
}






//name this whatever the command name is.
module.exports.help = {
  name: "honor",
  description: "Example"

}
