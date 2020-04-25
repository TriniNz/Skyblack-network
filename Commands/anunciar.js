exports.run = async (Discord, client, message, args, db, serverinfo) => {
 
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Você não tem permissão para executar este comando.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    let Ch = message.mentions.channels.first();
    if(!Ch) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. `.anunciar @Canal Texto a ser anunciado.`")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    let String = args.slice(1).join(' ');
    if(args.length < 2) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. O anúncio deve conter mais de 2 palavras")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});


    Ch.send(new Discord.RichEmbed()
        .setAuthor("Anúncio!", "https://cdn.discordapp.com/emojis/621455229790978070.gif?v=1")
        .setDescription(String)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Autor: ${message.author.username} • IP: ${serverinfo.map('IP').value()}`, message.author.displayAvatarURL)
        .setTimestamp(new Date())
        .setColor(serverinfo.map('color').value()[0])
    ).then(Sucess => {Ch.send(`@everyone`).then(2*1000).then(s => s.delete(1500)); message.delete(1500)})

}