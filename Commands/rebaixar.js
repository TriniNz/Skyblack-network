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
        Role = [];
        Role[0] = message.guild.roles.get(args[1].replace('<@&', "").replace('>', ""));
        Role[1] = message.guild.roles.get(args[2].replace('<@&', "").replace('>', ""));
    
    if(!Member) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. Use `.rebaixar @Membro @CargoAtual @NovoCargo`")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(!Role[0] || !Role[1]) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Comando utilizado incorretamente. Use `.rebaixar @Membro @CargoAtual @NovoCargo`")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(!Member.roles.find(r => r.id == Role[0].id)) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription(`O membro ${Member} não é um ${Role[0]}.`)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    ch.send(new Discord.RichEmbed()
        .setAuthor("👥 Changelog.", message.guild.iconURL)
        .setDescription(`${Member}, ex-${Role[0]} foi rebaixado para ${Role[1]}.`)
        .setFooter(`Responsavel: ${message.author.username} • SkyBlack Network ©️`)
        .setColor(serverinfo.map('color').value()[0])
    )

    Member.removeRole(Role[0])
    Member.addRole(Role[1])

    message.channel.send(new Discord.RichEmbed()
        .setFooter(`${Member.user.username} foi rebaixado para ${Role[1].name}. Responsavel: ${message.author.username}.`)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg =>{msg.delete(15*1000); message.delete(15*1000)})
}