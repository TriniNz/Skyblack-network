exports.run = async (Discord, client, message, args, db, serverinfo) => {

    let nick = "",
        sugestao = "",
        motivo = "";

    let Ch = message.guild.channels.get(serverinfo.map('sugestionChannel').value()[0])
        if(!Ch) return message.channel.send(new Discord.RichEmbed()
            .setTitle('⚠️ Ops!')
            .setDescription("Não foi definido nem um canal de sugestões. Chame um superior para que ele faça ísto com o comando `.svconfig`.")
            .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    message.channel.send(new Discord.RichEmbed()
        .setFooter('Enviei uma mensagem em sua DM, tenha certeza de que ela está aberta!', message.author.displayAvatarURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    message.author.send(new Discord.RichEmbed()
        .setTitle('✉️ ' + serverinfo.map('clientName').value() +  ' Sugestões!')
        .setDescription(`Nós, dá ${serverinfo.map('clientName').value()} prezamos pela melhor jogabilidade de nossos membros, por isso, aceitamos sugestões de como melhorar :)`)
        .addField("Em primeiro lugar...", "Nós diga qual o seu nick.")
        .setColor(serverinfo.map('color').value()[0])
        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
    ).then(sended => {
    
        const filter = msg => !msg.author.bot && msg.content.length > 3;
        const MC = sended.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

        MC.on('collect', c => {
            nick = c.content;

            message.author.send(new Discord.RichEmbed()
                .setTitle('✉️ ' + serverinfo.map('clientName').value() +  '  Sugestões!')
                .addField("Agora nós diga", "Qual a sua sugestão?")
                .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            ).then(sendedtwo => {

                const MCTwo = sendedtwo.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

                MCTwo.on('collect', ctwo => {
                    sugestao = ctwo.content;

                    message.author.send(new Discord.RichEmbed()
                        .setTitle('✉️ ' + serverinfo.map('clientName').value() +  '  Sugestões!')
                        .addField("E por fim", "Por que deveriamos aceitar sua sugestão?")
                        .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(sendedthree => {

                        const MCThree = sendedthree.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

                        MCThree.on('collect', cthree => {
                                motivo = cthree.content;

                            message.author.send(new Discord.RichEmbed()
                                .setTitle('✉️ ' + serverinfo.map('clientName').value() +  '  Sugestões!')
                                .setDescription("Agora que você já respondeu todas as perguntas, veja como ficou sua sugestão! Caso queira cancelar, basta reagir com ❎, ou se deseja envia-lá reaja com ✅.")
                                .addField('Qual o seu nick?', nick)
                                .addField('Qual a sua sugestão?', sugestao)
                                .addField('Por que deveria ser adicionada?', motivo)
                                .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                                .setColor(serverinfo.map('color').value()[0])
                            ).then(async Confirm => {
                                await Confirm.react('✅'); await Confirm.react('❎');

                                let filtertwo = (reaction, user) => ['✅','❎'].includes(reaction.emoji.name) && !user.bot;
                                let RC = Confirm.createReactionCollector(filtertwo, {max: 1, time: 30*1000});

                                RC.on('collect', reac => {
                                    if(reac.emoji.name == '✅') {

                                        Ch.send(new Discord.RichEmbed()
                                            .setTitle(`:bulb: │ ${serverinfo.map('clientName').value()} • Sugestão`)
                                            .addField(':bust_in_silhouette: │ Nick:', nick)
                                            .addField(':newspaper: │ Sugestão:', sugestao)
                                            .addField(':pencil: │ Por que deveríamos acrescenta-lá?', motivo)
                                            .setThumbnail(message.author.displayAvatarURL)
                                            .setFooter("Sugestão enviada por: " + message.author.tag + " • " + serverinfo.map('clientName').value() + "©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                                            .setTimestamp(new Date())
                                            .setColor(serverinfo.map('color').value()[0])
                                        ).then(async msg => {await msg.react('✅'); await msg.react('❎')})
                                        
                                        message.author.send(new Discord.RichEmbed()
                                            .setFooter('✅ Sugestão enviada!')
                                            .setColor(serverinfo.map('color').value()[0])
                                        )

                                    } else {
                                        message.author.send(new Discord.RichEmbed()
                                            .setFooter('❎ Envio cancelado!')
                                            .setColor(serverinfo.map('color').value()[0])
                                        )
                                    }
                                })

                            })

                        })
                    })
                })
            })
        })

    })
}