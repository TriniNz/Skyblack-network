exports.run = async (Discord, client, message, args, db, serverinfo) => {

    if(!serverinfo.map('FormOption').value()[0]) { 
        message.channel.send(new Discord.RichEmbed()
            .setTitle('👥 SkyBlack Forms')
            .setDescription('No momento, as inscrições estão encerradas. Quando abertas você será notificado.')
            .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        )

    } else {

        message.channel.send(new Discord.RichEmbed()
            .setTitle('👥 SkyBlack Forms')
            .setDescription(`Para aplicar-se basta [clicar aqui.](${serverinfo.map('URLFormulario').value()})`)
            .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        )
    }
}