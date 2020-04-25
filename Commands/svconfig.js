exports.run = async (Discord, client, message, args, db, serverinfo) => {

    db.read()

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setTitle('⚠️ Ops!')
        .setDescription("Você não tem permissão para executar este comando.")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

    let msgInit = await message.channel.send(new Discord.RichEmbed()
        .setTitle('⚙️ Server Config')
        .setDescription(`Reaja com o emoji correspondente a configuração que você deseja fazer.`)
        .addField(":one: **Design**","• Prefix, color, ip.", true)
        .addField(":two: **Social**", "• Youtube, Twitter, Facebook...")
        .addField(":three: **Game Options**", "• Youtube, Twitter, Facebook...")
        .addField(":four: **Bot Options**", "Devmode, Channels...")
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    )

    const RC =  msgInit.createReactionCollector((reaction, user) => ['1⃣','2⃣','3⃣','4⃣'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})
    await msgInit.react('1⃣'); await msgInit.react('2⃣'); await msgInit.react('3⃣'); await msgInit.react('4⃣'); 

    RC.on('collect', rc => {

        msgInit.clearReactions()
        switch (rc.emoji.name) {
            case '1⃣':
                Desgin(Discord, client, message, args, db, serverinfo, msgInit)

                break;
            case '2⃣':
                Social(Discord, client, message, args, db, serverinfo, msgInit)
                
                break;
            case '3⃣':
                GameOptions(Discord, client, message, args, db, serverinfo, msgInit)
                
                break;
            case '4⃣':
                BotFunctions(Discord, client, message, args, db, serverinfo, msgInit)
                
                break;
        }
    })

}

async function Desgin(Discord, client, message, args, db, serverinfo, msgInit) {

    msgInit.edit(new Discord.RichEmbed()
        .setTitle('⚙️ Server Config')
        .addField(':one: Embed Color', `• Atual: *${serverinfo.map('color').value()}*`)
        .addField(':two: Prefix', `• Atual: *${serverinfo.map('prefix').value()}*\n• Padrão: *${serverinfo.map('padrãoPrefix').value()}*`)
        .addField(':three: IP', `• Atual: *${serverinfo.map('IP').value()}*`)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    )

    await msgInit.react('1⃣'); await msgInit.react('2⃣'); await msgInit.react('3⃣');
    const RC =  msgInit.createReactionCollector((reaction, user) => ['1⃣','2⃣','3⃣'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})

    RC.on('collect', rc => {
        msgInit.clearReactions()
        switch (rc.emoji.name) {
            case '1⃣':
                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Altere a cor das Embeds com o padrão exadecimal. (Responda esta mensagem com o codigo da cor, ou use `reset` para resetar a cor.)')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )

                let Mc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

                Mc.on('collect', coll => {
                    
                    if(!/^#[0-9A-F]{6}$/i.test(coll.content) && coll.content != "reset") return msgInit.edit(new Discord.RichEmbed()
                        .setTitle('⚙️ Server Config')
                        .setDescription('Operação cancelada. *O codigo enviado não é uma cor valida.*')
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                    if(coll.content == "reset") return msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription('Operação foi concluida com exito! A cor foi resetada.')
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"color": serverinfo.map('color').value()[0]}).assign({"color": serverinfo.map('padrãoColor').value()[0]}).write()})

                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! A cor foi alterada para *${coll.content}*.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"color": serverinfo.map('color').value()[0]}).assign({"color": coll.content}).write()})
                })
                
                break;
            case '2⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Altere o prefixo do bot. (Use um prefix com ate 3 caracteres ou `reset` para voltar ao padrão.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mcc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mcc.on('collect', coll => {
                
                if(coll.content > 0 && coll.content < 3 && coll.content != "reset") return msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação cancelada. *O prefixo não possui caracteres suficientes ou ultrapassa o limite de 3 caracteres.*')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                if(coll.content == "reset") return msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação foi concluida com exito! O prefixo foi resetado.')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"prefix": serverinfo.map('prefix').value()[0]}).assign({"prefix": serverinfo.map('padrãoPrefix').value()[0]}).write()})

                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! O prefixo foi alterada para *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"prefix": serverinfo.map('prefix').value()[0]}).assign({"prefix": coll.content}).write()})
            })
                
                
                break;
            case '3⃣':
 
                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Altere o IP do servidor. (Não utilize espaços.)')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )

                let Mccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

                Mccc.on('collect', coll => {
                    
                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! O IP foi alterada para *${coll.content}*.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"IP": serverinfo.map('IP').value()[0]}).assign({"IP": coll.content}).write()})
                })
                
                break;
        }
    })
}

async function Social(Discord, client, message, args, db, serverinfo, msgInit) {

    msgInit.edit(new Discord.RichEmbed()
        .setTitle('⚙️ Server Config')
        .addField(':one: Canal do Youtube', `• Atual: *${serverinfo.map('URLYT').value()}*`)
        .addField(':two: Faceebok', `• Atual: *${serverinfo.map('URLFacebook').value()}`)
        .addField(':three: Loja', `• Atual: *${serverinfo.map('URLloja').value()}*`)
        .addField(':three: Twitter', `• Atual: *${serverinfo.map('URLTwitter').value()}*`)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    )

    await msgInit.react('1⃣'); await msgInit.react('2⃣'); await msgInit.react('3⃣'); await msgInit.react('4⃣');
    const RC =  msgInit.createReactionCollector((reaction, user) => ['1⃣','2⃣','3⃣','4⃣'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})

    RC.on('collect', rc => {

        switch (rc.emoji.name) {
            case '1⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Altere o url canal YT do servidor. (Caso não haja utilize `Em breve`.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mc.on('collect', coll => {
                
                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! O YT foi alterada para *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"URLYT": serverinfo.map('URLYT').value()[0]}).assign({"URLTY": coll.content}).write()})
            })
                
                break;
        
            case '2⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Altere o url Facebook do servidor. (Caso não haja utilize `Em breve`.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mcc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mcc.on('collect', coll => {
                
                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! O Faceebok foi alterada para *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"URLFacebook": serverinfo.map('URLFacebook').value()[0]}).assign({"URLFacebook": coll.content}).write()})
            })
                
                break;

            case '3⃣':

                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Altere o url da Loja do servidor. (Caso não haja utilize `Em breve`.)')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )

                let Mccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

                Mccc.on('collect', coll => {
                    
                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! A loja foi alterada para *${coll.content}*.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"URLloja": serverinfo.map('URLloja').value()[0]}).assign({"URLloja": coll.content}).write()})
                })
            
                break;

            case '4⃣':

                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Altere o url do Twitter do servidor. (Caso não haja utilize `Em breve`.)')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )

                let Mcccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

                Mcccc.on('collect', coll => {
                    
                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! O Twitter foi alterada para *${coll.content}*.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"URLTwitter": serverinfo.map('URLTwitter').value()[0]}).assign({"URLTwitter": coll.content}).write()})
                })
        
                break;
        }
    
    })

}

async function GameOptions(Discord, client, message, args, db, serverinfo, msgInit) {

    msgInit.edit(new Discord.RichEmbed()
        .setTitle('⚙️ Server Config')
        .addField(':one: Requisitos Youtuber', `• Atual: *${serverinfo.map('YTReqs').value()}*`)
        .addField(':two: Requisitos mini Youtuber', `• Atual: *${serverinfo.map('MiniYTReqs').value()}*`)
        .addField(':three: Formulário option', `• Atual: *${serverinfo.map('FromOption').value()[0] ? "Aberto" : "Fechado"}*`)
        .addField(':three: Formulário URL', `• Atual: *${serverinfo.map('URLFormulario').value()}*`)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    )

    await msgInit.react('1⃣'); await msgInit.react('2⃣'); await msgInit.react('3⃣'); await msgInit.react('4⃣');
    const RC = msgInit.createReactionCollector((reaction, user) => ['1⃣','2⃣','3⃣','4⃣'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})

    RC.on('collect', rc => {

        switch (rc.emoji.name) {
            case '1⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Altere os requisitos para se tonar Youtuber do servidor. (Explique detalhadamente o que é necessario para se tonar Youtuber.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mc.on('collect', coll => {
                
                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! Os requisitos para Youtuber foram alterados para *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"YTReqs": serverinfo.map('YTReqs').value()[0]}).assign({"YTReqs": coll.content}).write()})
            })
                
                break;
        
            case '2⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Altere os requisitos para se tonar mini Youtuber do servidor. (Explique detalhadamente o que é necessario para se tonar mini Youtuber.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mcc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mcc.on('collect', coll => {
                
                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! Os requisitos para mini Youtuber foram alterados para *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"MiniYTReqs": serverinfo.map('MiniYTReqs').value()[0]}).assign({"MiniYTReqs": coll.content}).write()})
            })
                
                break;

            case '3⃣':
                msgInit.clearReactions()
                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Ligue ou desligue as inscrições para staffer.')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(async msgInit => {await msgInit.react('✅'); await msgInit.react('❎');})

                let Mccc = msgInit.createReactionCollector((reaction, user) => ['✅','❎'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})

                Mccc.on('collect', coll => {

                    if(coll.emoji.name == '✅') db.get('Serverconfig').find({"FormOption": serverinfo.map('FormOption').value()[0]}).assign({"FormOption": true}).write()
                    if(coll.emoji.name == '❎') db.get('Serverconfig').find({"FormOption": serverinfo.map('FormOption').value()[0]}).assign({"FormOption": false}).write()

                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! O formulario está *${serverinfo.map('FromOption').value()[0] ? "aberto" : "fechado"}* agora.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})
                })
            
                break;

            case '4⃣':

                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Altere o url do formulario do servidor. (Caso não haja utilize `Em breve`.)')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )

                let Mcccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

                Mcccc.on('collect', coll => {
                    
                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! O formulario foi alterado para *${coll.content}*.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"URLFormulario": serverinfo.map('URLFormulario').value()[0]}).assign({"URLFormulario": coll.content}).write()})
                })
        
                break;
        }
    
    })

}

async function BotFunctions(Discord, client, message, args, db, serverinfo, msgInit) {
    msgInit.edit(new Discord.RichEmbed()
        .setTitle('⚙️ Server Config')
        .addField(':one: ID da mensagem de Ticket', `• Atual: *${serverinfo.map('ticketMessageID').value()}*`)
        .addField(':two: ID da categorias de Ticket', `• Atual: *${serverinfo.map('ticketMessageID').value()}*`)
        .addField(':three: DevMode', `• Atual: *${serverinfo.map('FromOption').value()[0] ? "Ativado" : "Desativado"}*`)
        .addField(':four: ID do canal de Sugestões', `• Atual: *${serverinfo.map('URLFormulario').value()}*`)
        .addField(':five: ID do canal de Denúncias', `• Atual: *${serverinfo.map('URLFormulario').value()}*`)
        .addField(':six: ID do canal de Changelog', `• Atual: *${serverinfo.map('URLFormulario').value()}*`)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    )

    await msgInit.react('1⃣'); await msgInit.react('2⃣'); await msgInit.react('3⃣'); await msgInit.react('4⃣'); await msgInit.react('5️⃣'); await msgInit.react('6️⃣');
    const RC = msgInit.createReactionCollector((reaction, user) => ['1⃣','2⃣','3⃣','4⃣','5️⃣','6️⃣'].includes(reaction.emoji.name) && user.id == message.author.id, {max: 1, time: 60*1000})

    RC.on('collect', rc => {

        switch (rc.emoji.name) {
            case '1⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Diga qual mensagem as reações para criar o Ticket serão encontradas. (ID da mensagem.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mc.on('collect', coll => {
                
                if(isNaN(coll.content) || coll.content.length != 18) return msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação cancelada. *Este ID não é valido.*')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! A mensagem de ticket foi alterada para: *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"ticketMessageID": serverinfo.map('ticketMessageID').value()[0]}).assign({"ticketMessageID": coll.content}).write()})
            })
                
                break;
        
            case '2⃣':

                msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Diga qual categoria o Ticket será criado. (ID da categoria. Lembre-se de remover a permissão de `Everyone` de ler e ver canais.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mcc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mcc.on('collect', coll => {
                
                if(isNaN(coll.content) || coll.content.length != 18) return msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação cancelada. *Este ID não é valido.*')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! A categoria de ticket foi alterada para: *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"ticketCategoryID": serverinfo.map('ticketCategoryID').value()[0]}).assign({"ticketCategoryID": coll.content}).write()})
            })
                
                break;

            case '3⃣':
                msgInit.clearReactions()
                msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Ligue ou desligue o DevMode. (Apenas o desenvolvedor pode ativar.)')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(async msgInit => {await msgInit.react('✅'); await msgInit.react('❎');})

                let Mccc = msgInit.createReactionCollector((reaction, user) => ['✅','❎'].includes(reaction.emoji.name) && user.id == "429825875467304960", {max: 1, time: 60*1000})

                Mccc.on('collect', coll => {

                    if(coll.emoji.name == '✅') db.get('Serverconfig').find({"devmod": serverinfo.map('devmod').value()[0]}).assign({"devmod": true}).write()
                    if(coll.emoji.name == '❎') db.get('Serverconfig').find({"devmod": serverinfo.map('devmod').value()[0]}).assign({"devmod": false}).write()

                    msgInit.edit(new Discord.RichEmbed() 
                        .setTitle('⚙️ Server Config')
                        .setDescription(`Operação foi concluida com exito! O DevMode está *${serverinfo.map('FromOption').value()[0] ? "ativado" : "desativado"}* agora.`)
                        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                        .setColor(serverinfo.map('color').value()[0])
                    ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})
                })
            
                break;

            case '4⃣':

                msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Diga qual canal as sugestões serão enviadas. (ID do canal.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mcccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mcccc.on('collect', coll => {
                
                if(isNaN(coll.content) || coll.content.length != 18) return msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação cancelada. *Este ID não é valido.*')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! O canal de sugestões foi alterada para: *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"sugestionChannel": serverinfo.map('sugestionChannel').value()[0]}).assign({"sugestionChannel": coll.content}).write()})
            })
        
                break;

            case '5️⃣':

                msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Diga qual canal os reportes serão enviadas. (ID do canal.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mcccccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mcccccc.on('collect', coll => {
                
                if(isNaN(coll.content) || coll.content.length != 18) return msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação cancelada. *Este ID não é valido.*')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! O canal de reportes foi alterada para: *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"reportsChannel": serverinfo.map('reportsChannel').value()[0]}).assign({"reportsChannel": coll.content}).write()})
            })
        
            break;

        case '6️⃣':

            msgInit.edit(new Discord.RichEmbed()
                .setTitle('⚙️ Server Config')
                .setDescription('Diga qual canal as atualizações da staff serão enviadas. (ID do canal.)')
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            )

            let Mccccccc = msgInit.channel.createMessageCollector(msg => !msg.author.bot && msg.author.id == message.author.id, {max: 1, time: 60*1000})

            Mccccccc.on('collect', coll => {
                
                if(isNaN(coll.content) || coll.content.length != 18) return msgInit.edit(new Discord.RichEmbed()
                    .setTitle('⚙️ Server Config')
                    .setDescription('Operação cancelada. *Este ID não é valido.*')
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000)})

                msgInit.edit(new Discord.RichEmbed() 
                    .setTitle('⚙️ Server Config')
                    .setDescription(`Operação foi concluida com exito! O canal de changelog foi alterada para: *${coll.content}*.`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                ).then(msG => {msG.delete(30*1000); message.delete(30*1000); db.get('Serverconfig').find({"ChangelogChannel": serverinfo.map('ChangelogChannel').value()[0]}).assign({"ChangelogChannel": coll.content}).write()})
            })
        
            break;
        }
    })
}
