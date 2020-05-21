exports.run = async (Discord, client, message, args, db, serverinfo) => {

    message.channel.send(new Discord.RichEmbed()
        .setDescription('Este comando está em manutenção. Apenas o desenvolvedor pode utiliza-lo, aguarde ate que o mesmo seja liberado.')
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

} 