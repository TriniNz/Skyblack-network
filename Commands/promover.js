exports.run = async (Discord, client, message, args, db, serverinfo) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Você não tem permissão para executar este comando.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(isNaN(serverinfo.map('ChangelogChannel').value())) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Não há nem um canal em que eu possa enviar o log. Adicione um canal utilizado `.svconfig`.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    let ch = message.guild.channels.get(serverinfo.map('ChangelogChannel').value()[0]);
        if(!ch) return message.channel.send(new Discord.RichEmbed()
            .setTitle('⚠️ Ops!')
            .setDescription("Não há nem um canal em que eu possa enviar o log. Adicione um canal utilizado `.svconfig`.")
            .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});


    let Member = message.mentions.members.first(),
        Role = message.mentions.roles.first();
    
    if(!Member) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. Use `.promover @Membro @Cargo`")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(!Role) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. Use `.promover @Membro @Cargo`")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    ch.send(new Discord.RichEmbed()
        .setAuthor("👔 Changelog.", message.guild.iconURL)
        .setDescription(`${Member} foi promovido a ${Role}.`)
        .setFooter(`Responsavel: ${message.author.username} • SkyBlack Network ©️`)
        .setColor(serverinfo.map('color').value()[0])
    )

    Member.addRole(Role)

    message.channel.send(new Discord.RichEmbed()
        .setFooter(`${Member.user.username} foi promovido a ${Role.name} por ${message.author.username} com sucesso.`)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg =>{msg.delete(15*1000); message.delete(15*1000)})
    
}