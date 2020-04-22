exports.run = async (Discord, client, message, args, db, serverinfo, dbcmd) => {


    let name = dbcmd.get('Commands').map('name').value(),
    desc = dbcmd.get('Commands').map('desc').value()
    use = dbcmd.get('Commands').map('uso').value(),
    aliases = dbcmd.get('Commands').map('aliases').value(),
    info = []

    for(let x = 0; x < name.length; x++) {
        info.push(`*${x+1}*. **${name[x].charAt(0).toUpperCase() + name[x].substring(1)}**\n    • _Descrição_: ${desc[x]}\n    • _Utilização_: ${serverinfo.map('prefix').value()}${use[0]}\n    • _Metodos de uso:_ ${serverinfo.map('prefix').value()}*${String(aliases[x]).replace(/,+/g, `* - *${serverinfo.map('prefix').value()}`)}*\n`)
    }

    let cmds = subDividir(info, 3)

    let paginaAtual = 0

    message.channel.send(new Discord.RichEmbed()
        .setTitle('📖 Lista de comandos!')
        .setDescription(`Meu prefixo é ${serverinfo.map('prefix').value()} e tenho ${info.length} registrados. Entre eles temos: \n\n${cmds[paginaAtual].join('\n')}`)
        .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
        .setColor(serverinfo.map('color').value()[0])
    ).then(async m => {
        m.delete(80*1000); message.delete(80*1000);
        await m.react('⬅️'); await m.react('➡️');

        const nextp = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
        const collectnext = m.createReactionCollector(nextp, { time: 360*1000 });
        
        const antp = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
        const collectant = m.createReactionCollector(antp, { time: 360*1000 });

        collectnext.on('collect', async r => {
            if(cmds[paginaAtual - 1]) {
                paginaAtual -= 1

                await m.edit(new Discord.RichEmbed()
                    .setTitle('📖 Lista de comandos!')
                    .setDescription(`Meu prefixo é ${serverinfo.map('prefix').value()} e atualmente tenho ${info.length} registrados. Entre eles temos: \n\n${cmds[paginaAtual].join('\n')}`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )
                
                r.remove(message.author)
            }
        })

        collectant.on('collect', async r => {
            if(cmds[paginaAtual + 1]) {
                paginaAtual += 1
            
                await m.edit(new Discord.RichEmbed()
                    .setTitle('📖 Lista de comandos!')
                    .setDescription(`Meu prefixo é ${serverinfo.map('prefix').value()} e atualmente tenho ${info.length} registrados. Entre eles temos: \n\n${cmds[paginaAtual].join('\n')}`)
                    .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                    .setColor(serverinfo.map('color').value()[0])
                )

                r.remove(message.author)
                
            }
        })
    })



}


function subDividir(array, quantidade) { // Essa é uma função que divide um array em um array, basicamente você vai passar 2 paramêtros o array a ser divido e a quantiade máxima de elementos em cad array, e ele vai divdir esse array e vai retornar um array com esse array divido, se tu não entender só testa a função que tu vai entender
    let index = 0;
    let counter = 0;
    let newArray = [];
        newArray.push([]);
        while(newArray[index].length <= quantidade && array[counter]) {
            newArray[index].push(array[counter]);
            counter++;
            if(newArray[index].length + 1 > quantidade) {
                index++;
                newArray.push([])
            }
        }
        for(let i in newArray) {
            if(newArray[i].length === 0) {
                newArray.splice(i, 1)
            }
        }
    return newArray
}