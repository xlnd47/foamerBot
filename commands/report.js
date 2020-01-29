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
        reportPerson(message);
    }

}

async function getTopList(message){
    let sql = `select discordId, report from foamer.reputation order by report DESC limit 3`;

    con.query(sql,async function (err, result) {
        if (err) return console.log(err);

        var user1 = await client.fetchUser(result[0].discordId);
        var user2 = await client.fetchUser(result[1].discordId);
        var user3 = await client.fetchUser(result[2].discordId);


        const embed = new Discord.RichEmbed()
        .setTitle("Top 3 most reported")
        .setColor(0x00AE86)
        .addField(user1.tag, result[0].report)
        .addField(user2.tag, result[1].report)
        .addField(user3.tag, result[2].report)
        .setFooter("Tunahan is echt een boer ojooo")
        return message.reply(embed);
    });

}

function reportPerson(message){


    var user = message.mentions.users.first();
    if (user == undefined){
        return message.reply("fck u bruh");
    }
    if (message.member.id == user.id){
        return message.reply("rekt.");
    }
    let sql2 = `select lastTimeHonor < date(now()) bool from foamer.reputation where discordId = "${message.member.id}"`;
    con.query(sql2, function (err, result) {
        if (err) return console.log(err);

        if(result.length < 1){
            createUserAndreport(message, user);
        }else {
            if (result[0].bool == null){
                checkAndreport(message, user);
                updateLastTimereported(message);
            }else {
                // var date = new Date();
                // var unixTimestamp = Math.round(date.getTime());
                // var userDate = new Date(result[0].lastTimeReport);
                // var userDateString = epochToString(userDate);
                // var dateNowString = epochToString(unixTimestamp);
        
                // console.log("mysql now: " + userDateString);
                // console.log("nodejs now: " + dateNowString);
                // console.log(userDateString < dateNowString);
        
                if (result[0].bool == 1){
                    checkAndreport(message, user);
                    updateLastTimereported(message);
                }else {
                    return message.reply("bruh jij heb al gereported vandaag, probeer morgen opnieuw");
                }
            }
            
        }
    });
}

function createUserAndreport(message, user){
    let sql = `insert into reputation (discordId, lastTimeReport) values("${message.member.id}", CURDATE())`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        console.log("user created");
        checkAndreport(message, user);
    });


}


function checkAndreport(message, user){
    let sql = `select report from reputation where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        if (result < 1){
            createUser(message, user);
        }else {
            reportUser(message, user);
        }

    });
}

function updateLastTimereported(message){
    let sql = `update reputation set lastTimeReport = CURDATE() where discordId = "${message.member.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
    });
}

function reportUser(message, user){
    let sql = `update reputation set report = report + 1 where discordId = "${user.id}"`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        message.reply("deze bruh is reported");
    });
}

function epochToString(mysqlEpoch, epoch2){
    var userDate = new Date(mysqlEpoch);

    var month = userDate.getUTCMonth() + 1; //months from 1-12
    if (month < 10){
        month = "0" + month;
    }


    var day = userDate.getUTCDate() + 1;
    if (day < 10){
        day = "0" + day;
    }
    var year = userDate.getUTCFullYear();

    var newdate = year + "/" + month + "/" + day;


    var userDate2 = new Date(epoch2);

    var month2= userDate2.getUTCMonth() + 1; //months from 1-12
    if (month2 < 10){
        month2 = "0" + month2;
    }


    var day2 = userDate2.getUTCDate();
    if (day2 < 10){
        day2 = "0" + day2;
    }
    var year2 = userDate2.getUTCFullYear();

    var newdate2 = year2 + "/" + month2 + "/" + day2;

    if(newdate < newdate2){
        return true;
    }else {
        return false;
    }
}

function createUser(message, user){
    let sql = `insert into reputation (discordId, report) values("${user.id}", 1)`;
    con.query(sql, function (err, result) {
        if (err) return console.log(err);
        message.reply("deze bruh is reported");
    });
}


module.exports.help = {
  name: ["report", "dishonor"],
  description: "Example"

}
