const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Подключись сначала к голосовому каналу");

    if (!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send("Ваше аудио не записано");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

    const dispatcher = connection.play(stream, {
        type: "converted"
    });

    dispatcher.on("finish", () => {
        message.member.voice.channel.leave();
        return message.channel.send("Окончание записи аудио");
    })
}

module.exports.help = {
    name: "play"
};