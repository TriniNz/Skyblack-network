exports.run = async (Discord, client, message, args, db, serverinfo) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Você não tem permissão para executar este comando.")
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(isNaN(serverinfo.map('ChangelogChannel').value())) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Não há nem um canal em que eu possa enviar o log. Adicione um canal utilizado `.svconfig`.")
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    let ch = message.guild.channels.get(serverinfo.map('ChangelogChannel').value()[0]);
        if(!ch) return message.channel.send(new Discord.RichEmbed()
            .setTitle('⚠️ Ops!')
            .setDescription("Não há nem um canal em que eu possa enviar o log. Adicione um canal utilizado `.svconfig`.")
            .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});


    let Member = message.mentions.members.first(),
        Role = message.mentions.roles.first();
    
    if(!Member) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. Use `.remover @Membro @Cargo`")
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(!Role) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. Use `.remover @Membro @Cargo`")
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(!Member.roles.find(r => r.id == Role.id)) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription(`O membro ${Member} não é um ${Role}.`)
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    ch.send(new Discord.RichEmbed()
        .setAuthor("👥 Changelog.", message.guild.iconURL)
        .setDescription(`${Member} foi removido da equipe.`)
        .setFooter(`Responsavel: ${message.author.username} • ${serverinfo.map('clientName').value()} ©️`)
        .setColor(serverinfo.map('color').value()[0])
    )

    Member.removeRole(Role)

    message.channel.send(new Discord.RichEmbed()
        .setFooter(`${Member.user.username} perdeu seu cargo de ${Role.name}. Responsavel: ${message.author.username}.`)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg =>{msg.delete(15*1000); message.delete(15*1000)})
    
}