exports.run = async (Discord, client, message, args, db, serverinfo) => {

    let YTreq = serverinfo.map('YTReqs').value()[0],
    miniYTreq  =serverinfo.map('MiniYTReqs').value()[0];

    message.channel.send(new Discord.RichEmbed()
        .setTitle(`🎬 Parceiro ${serverinfo.map('clientName').value()}`)
        .setDescription(`*Cumprindo os requisitos necessários você pode se tornar um parceiro do ${serverinfo.map('clientName').value()}!*\n\n**Youtuber**\n • ${YTreq}\n**Youtuber Mirim**\n • ${miniYTreq}\n\n Caso você já tenha os requisitos, abra um ticket em <#702511506088132649> e aguarde!`)
        .setThumbnail('https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000);message.delete(15*1000)})

}