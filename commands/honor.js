const Discord = require("discord.js");
const config = require("../config.json");
let con;
let client;

module.exports.run = async (bot, message, args, conn) => {
  //this is where the actual code for the command goes
  //return message.reply("Hi, Tunahan is een meisje").then(m => m.delete(10000))
  con = conn;
  client = bot;
  if (args[0] == undefined) {
    getTopList(message);
  } else {
    honorPerson(message);
  }
};

async function getTopList(message) {
  let sql = `select discordId, honor from foamer.reputation order by honor DESC limit 3`;

  con.query(sql, async function(err, result) {
    if (err) return console.log(err);

    let user1 = await client.fetchUser(result[0].discordId);
    let user2 = await client.fetchUser(result[1].discordId);
    let user3 = await client.fetchUser(result[2].discordId);

    const embed = new Discord.RichEmbed()
      .setTitle("Top 3 most honored")
      .setColor(0x00ae86)
      .addField(user1.tag, result[0].honor)
      .addField(user2.tag, result[1].honor)
      .addField(user3.tag, result[2].honor)
      .setFooter("Tunahan is echt een boer ojooo");
    return message.reply(embed);
  });
}

function honorPerson(message) {
  let user = message.mentions.users.first();
  if (user == undefined) {
    return message.reply("fck u bruh");
  }
  if (message.member.id == user.id) {
    return message.reply("rekt.");
  }
  let sql2 = `select lastTimeHonor < date(now()) bool from foamer.reputation where discordId = "${message.member.id}"`;
  con.query(sql2, function(err, result) {
    if (err) return console.log(err);

    if (result.length < 1) {
      createUserAndHonor(message, user);
    } else {
      if (result[0].bool == null) {
        checkAndHonor(message, user);
        updateLastTimeHonored(message);
      } else {
        if (result[0].bool == 1) {
          updateLastTimeHonored(message);
          checkAndHonor(message, user);
        } else {
          return message.reply(
            "bruh jij heb al gehonored vandaag, probeer morgen opnieuw"
          );
        }
      }
    }
  });
}

function createUserAndHonor(message, user) {
  let sql = `insert into reputation (discordId, lastTimeHonor) values("${message.member.id}", date(now()))`;
  con.query(sql, function(err, result) {
    if (err) return console.log(err);
    console.log("user created");
    checkAndHonor(message, user);
  });
}

function checkAndHonor(message, user) {
  let sql = `select honor from reputation where discordId = "${user.id}"`;
  con.query(sql, function(err, result) {
    if (err) return console.log(err);
    if (result < 1) {
      createUser(message, user);
    } else {
      honorUser(message, user);
    }
  });
}

function updateLastTimeHonored(message) {
  let sql = `update reputation set lastTimeHonor = date(now()) where discordId = "${message.member.id}"`;
  con.query(sql, function(err, result) {
    if (err) return console.log(err);
  });
}

function honorUser(message, user) {
  let sql = `update reputation set honor = honor + 1 where discordId = "${user.id}"`;
  con.query(sql, function(err, result) {
    if (err) return console.log(err);
    message.reply("deze bruh is gehonored");
  });
}

function epochToString(mysqlEpoch, epoch2) {
  let userDate = new Date(mysqlEpoch);

  let month = userDate.getUTCMonth() + 1; //months from 1-12
  if (month < 10) {
    month = "0" + month;
  }

  let day = userDate.getUTCDate() + 1;
  if (day < 10) {
    day = "0" + day;
  }
  let year = userDate.getUTCFullYear();

  let newdate = year + "/" + month + "/" + day;

  let userDate2 = new Date(epoch2);

  let month2 = userDate2.getUTCMonth() + 1; //months from 1-12
  if (month2 < 10) {
    month2 = "0" + month2;
  }

  let day2 = userDate2.getUTCDate();
  if (day2 < 10) {
    day2 = "0" + day2;
  }
  let year2 = userDate2.getUTCFullYear();

  let newdate2 = year2 + "/" + month2 + "/" + day2;

  if (newdate < newdate2) {
    return true;
  } else {
    return false;
  }
}

function createUser(message, user) {
  let sql = `insert into reputation (discordId, honor) values("${user.id}", 1)`;
  con.query(sql, function(err, result) {
    if (err) return console.log(err);
    message.reply("deze bruh is gehonored");
  });
}

//name this whatever the command name is.
module.exports.help = {
  name: "honor",
  description:
    "Honors someone by mentioning them or display the top honored people",
  usage: `${config.prefix}honor @mention  OR  ${config.prefix}honor`
};
