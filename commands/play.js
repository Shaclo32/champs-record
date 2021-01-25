const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Please join a voice channel!");

    if (!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send("Аудио не записано");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

    const dispatcher = connection.play(stream, {
        type: "converted"
    });

    dispatcher.on("finish", () => {
        message.member.voice.channel.leave();
        return message.channel.send("Окончание проигрования записи");
    })
}

module.exports.help = {
    name: "play"
};
