exports.run = async (Discord, client, message, args, db, serverinfo) => {

    if(!serverinfo.map('FormOption').value()[0]) { 
        message.channel.send(new Discord.RichEmbed()
            .setTitle(`👥 ${serverinfo.map('clientName').value()} Forms`)
            .setDescription('No momento, as inscrições estão encerradas. Quando abertas você será notificado.')
            .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        )

    } else {

        message.channel.send(new Discord.RichEmbed()
            .setTitle(`👥 ${serverinfo.map('clientName').value()} Forms`)
            .setDescription(`Para aplicar-se basta [clicar aqui.](${serverinfo.map('URLFormulario').value()})`)
            .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        )
    }
}