const fs = require('file-system');
const {MessageAttachment} = require('discord.js')


module.exports.run = async (client,message,args) => {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Подключитесь сначала к голосовому каналу");

    const connection = await message.member.voice.channel.join();
    const receiver = connection.receiver.createStream(message.member,{
        mode:'pcm',
    });

    const writer = receiver.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
    writer.on("finish", () => {
        message.member.voice.channel.leave();
        message.channel.send("Конец записи");
    });

}

module.exports.help = {
    name:'record'
}