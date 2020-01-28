const Discord = require('discord.js')
var con;
var client;

module.exports.run = async (bot, message, args, conn) => {
    //this is where the actual code for the command goes
    //return message.reply("Hi, Tunahan is een meisje").then(m => m.delete(10000))
    con = conn;
    client = bot;
    if (args[0] == undefined){
        getTopList(message);
    }else {
        honorPerson(message);
    }

}

async function getTopList(message){
    //return message.reply("nog nie geimplementeerd bruh")


    let sql = `select discordId, honor from foamer.reputation order by honor DESC limit 3`;


    con.query(sql,async function (err, result) {
        if (err) return console.log(err);

        var user1 = await client.fetchUser(result[0].discordId);
        var user2 = await client.fetchUser(result[1].discordId);
        var user3 = await client.fetchUser(result[2].discordId);


        const embed = new Discord.RichEmbed()
        .setTitle("Top 3 most honored")
        .setColor(0x00AE86)
        .addField(user1.tag, result[0].honor)
        .addField(user2.tag, result[1].honor)
        .addField(user3.tag, result[2].honor)
        .setFooter("Tunahan is echt een boer ojooo")
        return message.reply(embed);
    });

}

function honorPerson(message){


    var user = message.mentions.users.first();
    //console.log(user.id);
    if (user == undefined){
        return message.reply("fck u bruh");
    }
    if (message.member.id == user.id){
        return message.reply("rekt.");
    }
    let sql2 = `select lastTimeHonor from reputation where discordId = "${message.member.id}"`;
    con.query(sql2, function (err, result) {
        if (err) return console.log(err);

        console.log("mysql now: " + result[0].lastTimeHonor);
        console.log("nodejs now: " + Date.now());
        // if (result < 1 ){
        //     createUserLastHonored();
        // }else if(result[0].lastTimeHonor !== Date.now()){

        // }

        
    });
    

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
    let sql = `insert into reputation (discordId, honor) values("${user.id}", 1)`;
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
