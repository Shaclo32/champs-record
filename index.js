const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Snowflake = require("snowflake-api");

client.db = require("quick.db");
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.config = {
    TOKEN: "Nzk5NTYyODg4NzIwNjc4OTQy.YAFY9w.aprxc0f6RV9SQx76ZQ-tmUsOzdM",
    API_TOKEN: "NTQ0NTE4ODE0NTQ1NDc3NjMy.MTYxMTE0NzYxODgzNw==.72d7bddfcbe786cf604fa8fe94d700b2",
    prefix: "!",
    cooldown: 15000
};
const api = new Snowflake.Client(client.config.API_TOKEN);
client.snowapi = api;

// Load Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
    });
});


client.once("ready", () => {
    console.log("Ready!");
});

client.on("error", console.error);

client.on("warn", console.warn);

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(client.config.prefix)) return;
    let args = message.content.slice(client.config.prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    let commandFile = client.commands.get(command);
    if (!commandFile) return;
    commandFile.run(client, message, args, api);
});


client.login(client.config.TOKEN);
