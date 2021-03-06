const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const fs = require("fs");
const mysql = require("mysql");
const request = require("request");
const querystring = require("querystring");
var Filter = require("bad-words");
var con;
var pool;
var rapidApi;
var filter = new Filter();
var help = new Array();

try {
  // // Connection Setup
  // con = mysql.createConnection({
  //     host: "localhost",
  //     user: config.dbUser,
  //     password: config.dbPassword,
  //     database : "foamer",
  //     connectTimeout: 1000000
  // });

  pool = mysql.createPool({
    host: "localhost",
    user: config.dbUser,
    password: config.dbPassword,
    database: "foamer"
  });

  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    con = connection;
    var sql1 = `select value from config where name = "botToken"`;
    con.query(sql1, function(err, result) {
      if (err) console.log(err);
      // console.log("using token: " + result[0].value);
      bot.login(result[0].value);
    });

    var sql = `select value from config where name = "rapidApi"`;
    con.query(sql, function(err, result) {
      if (err) console.log(err);
      //console.log(result[0].value);
      rapidApi = result[0].value;
    });
  });
} catch (e) {
  console.error(e);
}

bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);

    if (Array.isArray(props.help.name)) {
      props.help.name.forEach((n, i) => {
        bot.commands.set(n, props);
      });
    } else {
      bot.commands.set(props.help.name, props);
    }

    if (props.help.description !== "" && props.help.name !== "example") {
      help.push({
        prefix: `${props.help.name}`,
        description: `${props.help.description}`,
        usage: `${props.help.usage}`
      });
    }
  });

  /*//Logging of all available commands
help.forEach((o, i) => {
  console.log(`${i}: Prefix: ${o['prefix']}, Description: ${o['description']}`);
});
*/
});

bot.on("ready", () => {
  console.log(bot.user.username + " is online.");

  bot.user.setPresence({
    game: {
      name: "ur mom",
      type: "WATCHING"
    },
    status: "idle"
  });
});

function generateXp(message) {
  let min = 5;
  let max = 15;

  if (message.content.includes("bru")) {
    min = 15;
    max = 30;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    con = connection;
  });
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  var attachments = await message.attachments.array();
  //console.log(attachments.length)

  if (attachments.length > 0) {
    //console.log(attachments[0].url)
    checkUrl(attachments[0].url, message);
  }

  //console.log(filter);

  // console.log(message.content);
  // if (isSwearWord(message.content)){
  //   message.delete();
  //   return message.reply("danne boer...");
  // }

  if (message.content[0] !== config.prefix) {
    con.query(
      `select * from xp where discordId = "${message.author.id}"`,
      (err, rows) => {
        if (err) throw err;
        //console.log(rows);

        let sql1;
        if (rows.length < 1) {
          sql1 = `insert into xp(discordId, xp) values ("${
            message.author.id
          }", ${generateXp(message)})`;
        } else {
          let xp = rows[0].xp;

          sql1 = `update xp set xp = ${xp +
            generateXp(message)} where discordId = "${message.author.id}"`;
        }
        con.query(sql1);

        checkLevelUp(message);
      }
    );
  }

  if (message.content.indexOf(config.prefix) !== 0) return;

  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;

  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if (commandfile) {
    if (command.slice(prefix.length) === "help") {
      commandfile.run(bot, message, args, con, help);
    } else {
      commandfile.run(bot, message, args, con);
    }
  }
});

function isSwearWord(message) {
  //console.log(filter);
  for (i = 0; i < filter.list.length; i++) {
    var rgx = new RegExp(filter.list[i], "gi");
    //console.log(rgx);
    if (rgx.test(message)) {
      return true;
    }
  }
}

function checkLevelUp(message) {
  let sql2 = `select * from xp where discordId = "${message.author.id}"`;
  con.query(sql2, (err, rows) => {
    if (err) return message.reply(err);
    let xpNeeded = 5 * (rows[0].level ^ 2) + 50 * rows[0].level + 100;
    //console.log(xpNeeded);

    if (xpNeeded < rows[0].xp) {
      levelUp(message.author.id, message, rows[0].level);
    }
  });
}

function levelUp(id, message, lvl) {
  let sql3 = `update xp set level = ${lvl + 1} where discordId = "${id}"`;
  let sql4 = `update xp set xp = 0 where discordId = "${id}"`;
  con.query(sql3);
  con.query(sql4);

  message.reply(`bruh, ge zijt level ${lvl + 1} nu bruh`);
}

async function checkUrl(urlPic, message) {
  var url = "https://nuditysearch.p.rapidapi.com/nuditySearch/image";
  var form = {
    setting: "2",
    objecturl: urlPic
  };

  var formData = querystring.stringify(form);
  var contentLength = formData.length;

  var headers = {
    "x-rapidapi-host": "nuditysearch.p.rapidapi.com",
    "x-rapidapi-key": rapidApi,
    "content-type": "application/x-www-form-urlencoded",
    "Content-Length": contentLength
  };

  var options = {
    method: "POST",
    body: formData,
    url: url,
    headers: headers
  };

  request(options, callback);
  async function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = await JSON.parse(body);
      console.log(result);
      if (result.classification == "NUDITY") {
        if (result.score > 50) {
          message.delete();
          message.reply("teveel naaktheid bruh...");
        }
      }
    } else {
      console.log(body);
    }
  }
}
