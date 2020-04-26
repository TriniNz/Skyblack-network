exports.run = async (Discord, client, message, args, db, serverinfo) => {
 
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Você não tem permissão para executar este comando.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    if(message.channel.parent.id != serverinfo.map('ticketCategoryID').value()[0]) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Este não é um canal de tickets.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    message.channel.send(new Discord.RichEmbed()
        .setTitle(':gear: Configurar Tickets')
        .addField(':one: Apagar este canal.',"Deletar o canal de ticket.")
        .addField(':two: Em breve.',"🤫")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(async msgInit => {
        await msgInit.react('1️⃣');

        const RC =  msgInit.createReactionCollector((reaction, user) => ['1️⃣','2⃣','3⃣','4⃣'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})

        RC.on('collect', coll => {
            switch (coll.emoji.name) {
                case "1️⃣":
                    
                    let emj = message.channel.name.split('-')[0],
                    ticketaid = message.channel.topic.split(' ')[3]
                    
                    message.guild.channels.map(ch => {
                        if(ch.type == 'text') ch.fetchMessage(serverinfo.map('ticketMessageID').value()[0]).then(async fetched => {
                            await fetched.reactions.map(r => {if(r.emoji.name == emj) r.remove(ticketaid)})
                        }).catch(() => 0);
                    })

                    message.author.send(new Discord.RichEmbed()
                        .setFooter("Você deletou o ticket com sucesso.")
                        .setColor(serverinfo.map('color').value()[0])
                    ).catch(() => 0);
                    message.channel.delete(1000)
                    
                break;
            }

        })

    })

}