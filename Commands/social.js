exports.run = async (Discord, client, message, args, db, serverinfo) => {

    let Loja = serverinfo.map('URLloja').value()[0],
        twitter = serverinfo.map('URLTwitter').value()[0],
        facebook = serverinfo.map('URLFacebook').value()[0];


    message.channel.send(new Discord.RichEmbed()
        .setTitle(`🗣️ ${serverinfo.map('clientName').value()} Social!`)
        .addField(`• Facebook`, facebook)
        .addField(`• Loja`, Loja)
        .addField(`• Twitter`, twitter)
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

}