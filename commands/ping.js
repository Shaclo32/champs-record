module.exports.run = (client, message, args) => {
    return message.reply("Соеденение! "+Math.round(client.ws.ping));
}

module.exports.help = {
    name: "ping"
};
