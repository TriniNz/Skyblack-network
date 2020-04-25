exports.run = async (Discord, client, raw, db) => {

    let serverinfo = db.get('Serverconfig'),
        messageID = serverinfo.map('ticketMessageID').value()[0],
        topicID = serverinfo.map('ticketCategoryID').value()[0],
        emojis = ["🛒","🐞","🔑","📨","🤖","💡"];

    if(raw.t == 'MESSAGE_REACTION_ADD') {

        let guild = client.guilds.get('649255797116764160'),
            author = guild.members.get(raw.d.user_id),
            topic = guild.channels.get(topicID);

        if(!emojis.includes(raw.d.emoji.name)) return;
        if(raw.d.message_id != messageID) return;

        if(guild.channels.find(ch => ch.topic && ch.topic.includes(author.user.id))) return;
        
        let Ch = await guild.createChannel(`${raw.d.emoji.name}-${author.user.username}`, {type: 'text'});
        await Ch.setParent(topic);
        await Ch.lockPermissions();
        await Ch.setTopic(`${raw.d.emoji.name} Ticket ID: ${author.id}`)

        await Ch.overwritePermissions(author, {
            "SEND_MESSAGES":true,
            "VIEW_CHANNEL":true
        })

        await Ch.send(new Discord.RichEmbed()
            .setTitle(`${indetify(raw.d.emoji.name)} | BlackSky Suporte!`)
            .setDescription(`⟐ Olá, ${author} que abriu\n\n• Aguarde um membro da nossa equipe comparecer para que sua dúvida possa ser esclarecida e seu ticket respondido.\n• Caso não tenha resposta dentro de 1 hora, você poderá marcar a tag @:stars:Equipe SkyBlack:stars: \n• O abuso da menção, ou o uso da mesma em outros canais, poderá resultar em punição.\n\n                • Responderemos a esse ticket o mais rápido possível.\n\n• Você terá 1 hora para falar, caso não fale nada iremos fechar.\n\nAtt: Rede SkyBlack`)
            .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), guild.iconURL)
            .setColor(serverinfo.map('color').value()[0])
        ).then(async msg => {
            await msg.pin()
            await msg.channel.bulkDelete(1)
        })

        setTimeout(() => {
        
            Ch.fetchMessages({limit: 20}).then(Fetched => {
                let fetchedforfind = Fetched.filter(Msg => Msg.author.id == author.id)
                if(fetchedforfind.size < 1) Ch.delete(1500).then(() => author.send(new Discord.RichEmbed()
                    .setFooter(`Seu ticket foi encerrado por inatividade.`)
                    .setColor(serverinfo.map('color').value()[0])
                ))
            })

        }, 20*1000*60);

    }

    if(raw.t == 'MESSAGE_REACTION_REMOVE') {

        if(!emojis.includes(raw.d.emoji.name)) return;
        if(raw.d.message_id != messageID) return;

        let guild = client.guilds.get(raw.d.guild_id),
            author = guild.members.get(raw.d.user_id);

        let chf = guild.channels.find(ch => ch.topic && ch.topic.includes(author.user.id) && ch.topic.includes(raw.d.emoji.name))
        if(chf) chf.delete(500)

    }

}

function indetify(emoji) {
    if(emoji == '🛒') return `🛒 Ticket Compras`;
    if(emoji == '🐞') return `🐞 Ticket Bugs`;
    if(emoji == '📨') return `📨 Ticket Dúvidas`;
    if(emoji == '🔑') return `🔑 Ticket Unban`;
    if(emoji == '💡') return `💡 Ticket Tag`;
    if(emoji == '🤖') return `🤖 Ticket Bots`;
}