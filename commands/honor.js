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
    if (user == undefined){
        return message.reply("fck u bruh");
    }
    if (message.member.id == user.id){
        return message.reply("rekt.");
    }
    let sql2 = `select lastTimeHonor from reputation where discordId = "${message.member.id}"`;
    con.query(sql2, function (err, result) {
        if (err) return console.log(err);

        if(result.length < 1){
            createUserAndHonor(message, user);
        }else {
            var date = new Date();
            var unixTimestamp = Math.round(date.getTime());
            var userDate = new Date(result[0].lastTimeHonor);
            var userDateString = epochToString(userDate);
            var dateNowString = epochToString(unixTimestamp);
    
            console.log("mysql now: " + userDateString);
            console.log("nodejs now: " + dateNowString);
            console.log(userDateString < dateNowString);
    
            if (userDateString < dateNowString){
                checkAndHonor(message, user);
                updateLastTimeHonored(message);
            }else {
                return message.reply("bruh jij heb al gehonored vandaag, probeer morgen opnieuw");
            }
        }
    });
}

function createUserAndHonor(){
    let sql = `insert into reputation (discordId, lastTimeHonor) values("${user.id}", CURDATE())`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        console.log("user created");
        checkAndHonor(message, user);
    });


}


function checkAndHonor(message, user){
    let sql = `select honor from reputation where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        if (result < 1){
            createUser(message, user);
        }else {
            honorUser(message, user);
        }

    });
}

function updateLastTimeHonored(message){
    let sql = `update reputation set lastTimeHonor = CURDATE() where discordId = "${message.member.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
    });
}

function honorUser(message, user){
    let sql = `update reputation set honor = honor + 1 where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        message.reply("deze bruh is gehonored");
    });
}

function epochToString(epoch){
    var userDate = new Date(epoch);

    var month = userDate.getUTCMonth() + 1; //months from 1-12
    if (month < 10){
        month = "0" + month;
    }


    var day = userDate.getUTCDate();
    if (day < 10){
        day = "0" + day;
    }
    var year = userDate.getUTCFullYear();

    var newdate = year + "/" + month + "/" + day;

    return newdate;

}

function createUser(message, user){
    let sql = `insert into reputation (discordId, honor) values("${user.id}", 1)`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        message.reply("deze bruh is gehonored");
    });
}



//name this whatever the command name is.
module.exports.help = {
  name: "honor",
  description: "Example"

}
