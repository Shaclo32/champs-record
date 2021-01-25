const fs = require("fs");

    module.exports.run = async (client, message, args) => {

        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Сначала подключитесь к голосовому каналу");

        const connection = await message.member.voice.channel.join();
        const audio = connection.receiver.createStream(message.member, { mode: 'opus', end: 'silence'});

        audio.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
        audio.on("end", () => {
            message.channel.send("Запись окончена");
        });

    }

    module.exports.help = {
        name: "record"
    };
