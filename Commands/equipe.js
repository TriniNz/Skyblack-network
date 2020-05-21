exports.run = async (Discord, client, message, args, db, serverinfo) => {

    const groups = ["701576254159323136","701576254968692836","701576256013205684","701576256701071390",'701576257862893719',"701576258206564353","701576259028910151"];
    
    let st = ""

    groups.forEach(Groups => {
        message.guild.roles.get(Groups).members.map(M => st += "<@" + M.id + ">\n");
        st += "^|";
    })

    const arr = st.split("^|");

    for(let x=0; x < arr.length; x++) {
        if(arr[x].length < 1) arr[x] = "Não há membros com este cargo!"
    }

    let Fields = []

    for(let x=0; x < groups.length; x++) {
        Fields.push({
            name: `${message.guild.roles.get(groups[x]).name} [${message.guild.roles.get(groups[x]).members.size}]`,
            value: arr[x]
        })
    }

    const Embed = {
        title: `👥 Equipe de moderação ${serverinfo.map('clientName').value()}!`,
        fields: Fields,
        color: Number("0x" + serverinfo.map('color').value()[0].replace('#', '')),
        footer: {
            text: serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(),
            icon_url: message.author.displayAvatarURL
        }
    }

    message.channel.send({ embed: Embed}).then(msg => {msg.delete(60*1000); message.delete(60*1000)});
}