exports.run = async (Discord, client, message, args, db, serverinfo) => {

    let nick = "",
    prova = "",
    motivo = "",
    detalhes = "";

    let Ch = message.guild.channels.get(serverinfo.map('reportsChannel').value()[0])
    if(!Ch) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Não foi definido nem um canal de reportes. Chame um superior para que ele faça ísto com o comando `.svconfig`.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});


    message.channel.send(new Discord.RichEmbed()
        .setFooter('Enviei uma mensagem em sua DM, tenha certeza de que ela está aberta.', message.author.displayAvatarURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    message.author.send(new Discord.RichEmbed()
        .setTitle('🗳️ SkyBlack Denúncias!')
        .setDescription("Prezando pela qualidade de nosso servidor, utilizamos o sistema de reportes anônimos, ou seja, você pode reportar sem medo de que algo lhe aconteça.")
        .addField('Para começar.',`Qual o nick utilizado pelo denunciado? `)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(async sended => {

        const filter = msg => !msg.author.bot && msg.content.length > 3;
        const MC = sended.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

        MC.on('collect', c => {
            nick = c.content;

            message.author.send(new Discord.RichEmbed()
                .setTitle('🗳️ SkyBlack Denúncias!')
                .addField('Agora responda.',`Qual motivo desta denúncia? (Uso de hack, spam, flood, e etc.)`)
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            ).then(async sendedtwo => {

                const MCtwo = sended.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

                MCtwo.on('collect', ctwo => {
                    motivo = ctwo.content;
        
                    message.author.send(new Discord.RichEmbed()
                        .setTitle('🗳️ SkyBlack Denúncias!')
                        .addField('Agora responda.',`Preencha com provas. (Prints, videos e etc.)`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(async sendedtwo => {
        
                        const MCthree = sended.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

                        MCthree.on('collect', cthree => {
                            prova = cthree.content;
                
                            message.author.send(new Discord.RichEmbed()
                                .setTitle('🗳️ SkyBlack Denúncias!')
                                .addField('Agora responda.',`Detalhadamente, explique o que ocorreu.`)
                                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                                .setColor(serverinfo.map('color').value()[0])
                            ).then(async sendedfour => {
                
                                const MCfour = sended.channel.createMessageCollector(filter, {max: 1, time: 5*1000*60});

                                MCfour.on('collect', ctfour => {
                                    detalhes = ctfour.content;
                        
                                    message.author.send(new Discord.RichEmbed()
                                        .setTitle('🗳️ SkyBlack Denúncias!')
                                        .setDescription("O resultado de sua denúncia foi este. Caso queira cancelar, basta reagir com ❎, ou se deseja envia-lá reaja com ✅.")
                                        .addField("Usuario reportado:", nick)
                                        .addField("Motivo:", motivo)
                                        .addField("Provas:", prova)
                                        .addField("O que ocorreu?:", detalhes)
                                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                                        .setColor(serverinfo.map('color').value()[0])
                                    ).then(async Confirm => {
                                        await Confirm.react('✅'); await Confirm.react('❎');

                                            let filtertwo = (reaction, user) => ['✅','❎'].includes(reaction.emoji.name) && !user.bot;
                                            let RC = Confirm.createReactionCollector(filtertwo, {max: 1, time: 30*1000});

                                            RC.on('collect', reac => {
                                                if(reac.emoji.name == '✅') {

                                                Ch.send(new Discord.RichEmbed()
                                                    .setTitle('🗳️ SkyBlack Denúncias!')
                                                    .setDescription("Foi enviada uma nova denuncia.")
                                                    .addField("Usuario reportado:", nick)
                                                    .addField("Motivo:", motivo)
                                                    .addField("Provas:", prova)
                                                    .addField("O que ocorreu?:", detalhes)
                                                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                                                    .setTimestamp(new Date())
                                                    .setColor(serverinfo.map('color').value()[0])
                                                )
                                        
                                                message.author.send(new Discord.RichEmbed()
                                                    .setFooter('✅ Denúncia enviada!')
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
        })
    })
}