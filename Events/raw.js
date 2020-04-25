exports.run = async (Discord, client, raw, db) => {

    let serverinfo = db.get('Serverconfig'),
        messageID = serverinfo.map('ticketMessageID').value()[0],
        topicID = serverinfo.map('ticketCategoryID').value()[0],
        emojis = ["🛒","🐞","🔑","📨","🤖","💡"];

    if(raw.t == 'MESSAGE_REACTION_ADD') {

        let guild = client.guilds.get(raw.d.guild_id),
            author = guild.members.get(raw.d.user_id),
            topic = guild.channels.get(topicID);

        if(!emojis.includes(raw.d.emoji.name)) return;
        if(raw.d.message_id != messageID) return;

        if(guild.channels.find(ch => ch.topic && ch.topic.includes(author.user.id))) return;
        
        let Ch = await guild.createChannel(`${raw.d.emoji.name}-${author.user.username}`, {type: 'text'});
        await Ch.setParent(topic);
        await Ch.setTopic(`${raw.d.emoji.name} Ticket ID: ${author.id}`)
        await Ch.lockPermissions();

        await Ch.overwritePermissions(author, {
            "SEND_MESSAGES":true,
            "VIEW_MESSAGES":true,
        })

        await Ch.send(new Discord.RichEmbed()
            .setTitle(`${raw.d.emoji.name} BlackSky Suporte!`)
            .setDescription(indetify(author, raw.d.emoji.name))
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

        }, 6*1000*60);

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

function indetify(member, emoji) {
    if(emoji == '🛒') return `Olá, ${member} você abriu um ticket para *Compras*. Diga sua duvida e aguarde ate que um superior venha saná-la.`;
    if(emoji == '🐞') return `Olá, ${member} você abriu um ticket para *Reportar bugs*. Para acelerar o processo envie-me as seguintes informações: \`\`\`Seu nick:\nExplicação do bug:\nProvas de que este bug existe:\`\`\``;
    if(emoji == '📨') return `Olá, ${member} você abriu um ticket para *Qualquer dúvida relacionada ao servidor*. Diga sua duvida e aguarde ate que um superior venha saná-la.`;
    if(emoji == '🔑') return `Olá, ${member} você abriu um ticket para *Solicitar unban*. Para acelerar o processo envie-me as seguintes informações: \`\`\`Seu nick:\nStaffer que lhe baniu:\nMotivo do seu ban\nO que está errado em sua punição. Explique com detalhes.\`\`\``;
    if(emoji == '💡') return `Olá, ${member} você abriu um ticket para *Solicitar tag*. Para acelerar o processo envie-me as seguintes informações: \`\`\`Seu nick:\nTag solicitada:\nProvas de que você possue esta tag no game.\`\`\``;
    if(emoji == '🤖') return `Olá, ${member} você abriu um ticket para *Dúvidas sobre o bot*. Diga sua duvida e aguarde ate que um superior venha saná-la.`;
}