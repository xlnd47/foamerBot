const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
const mysql = require('mysql');
var con;
var token;


try {
  // Connection Setup
  con = mysql.createConnection({
      host: "localhost",
      user: config.dbUser,
      password: config.dbPassword,
      database : "foamer",
      connectTimeout: 1000000
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
  let min = 10;
  let max = 30;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  con.query(`select * from xp where discordId = "${message.author.id}"`, (err, rows) => {
    if (err) throw err;
    //console.log(rows);

    let sql1;
    if(rows.length < 1){
      sql1 = `insert into xp(discordId, xp) values ("${message.author.id}", ${generateXp()};)`;
    } else {
      let xp = rows[0].xp;

      sql1 = `update xp set xp = ${xp + generateXp()} where discordId = "${message.author.id}"`;
    }

    con.query(sql1, console.log);

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


