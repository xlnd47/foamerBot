const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const fs = require("fs");
const mysql = require('mysql');
var con;
var pool;


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
    database : "foamer"
  });

  



  var sql = `select value from config where name = "botToken"`;
  con.query(sql, function (err, result) {
    if (err) console.log(err);
    //console.log(result[0].value);
    bot.login(result[0].value)
  });
} catch (e) {
  console.error(e);
}


bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});


bot.on("ready", () => {
  console.log(bot.user.username + " is online.")
  bot.user.setPresence({
    game: { 
        name: 'ur mom',
        type: 'WATCHING'
    },
    status: 'idle'

  }) 

});

function generateXp(){
  let min = 5;
  let max = 25;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}




bot.on("message", async message => {
  //a little bit of data parsing/general checks
  pool.getConnection(function(err, connection) {
    if(err){
      console.log(err);
      callback(true);
      return;
    }

    con = connection;
  })
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  con.query(`select * from xp where discordId = "${message.author.id}"`, (err, rows) => {
    if (err) throw err;
    //console.log(rows);

    let sql1;
    if(rows.length < 1){
      sql1 = `insert into xp(discordId, xp) values ("${message.author.id}", ${generateXp()})`;
    } else {
      let xp = rows[0].xp;

      sql1 = `update xp set xp = ${xp + generateXp()} where discordId = "${message.author.id}"`;
    }
    con.query(sql1);

    checkLevelUp(message);

  })

  if(message.content.indexOf(config.prefix) !== 0) return;

  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;


  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args, con);
})



function checkLevelUp(message){
  let sql2 = `select * from xp where discordId = "${message.author.id}"`
  con.query(sql2, (err, rows) => {
    if (err)
      return message.reply(err);
    let xpNeeded = 5 * (rows[0].level ^ 2) + 50 * rows[0].level + 100;
    //console.log(xpNeeded);

    if (xpNeeded<rows[0].xp){
      levelUp(message.author.id, message, rows[0].level)
    }
  })

}

function levelUp(id, message, lvl){
  let sql3 = `update xp set level = ${lvl + 1} where discordId = "${id}"`; 
  con.query(sql3);

  message.reply(`bru, ge zijt level ${lvl + 1} nu`);
}

