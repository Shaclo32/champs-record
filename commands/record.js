const fs = require("fs");

    module.exports.run = async (client, message, args) => {

        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Please join a voice channel first!");

        const connection = await message.member.voice.channel.join();
        const audio = connection.receiver.createStream(message.member, { mode: 'opus', end: 'silence'});

        audio.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
        audio.on("end", () => {

            message.channel.send("Finished writing audio");
        });

    }

    module.exports.help = {
        name: "record"
    };
