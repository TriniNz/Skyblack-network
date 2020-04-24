exports.run = async (Discord, client, message, db, dbcmd) => {

    const serverinfo = db.get('Serverconfig')
    const prefix = serverinfo.map('prefix').value()
    const devmode = serverinfo.map('devmode').value()

    if(message.isMentioned(client.user.id)) return message.channel.send(new Discord.RichEmbed()
        .setFooter(`👋 Olá ${message.author.tag}, meu prefixo é ${prefix} use ${prefix}cmdlist para ter acesso a todos meus comandos.`)
        .setColor(serverinfo.map('color').value()[0])
    )

    if(message.channel.type == "dm" || message.author.bot || devmode && message.author.id != '429825875467304960') return;

    const args = message.content.trim().split(/ +/g);
    const cmd = args.shift().toLowerCase().replace(prefix, '');

    const cmdValue = dbcmd.get('Commands')

    if(message.content.indexOf(prefix) == 0) {
        try {
            let cmdSearch = cmdValue.find({aliases: [cmd]}).value();

            if(cmdSearch.manutenção) return require('../Commands/Manutenção.js').run(Discord, client, message, args, db);

            let cmdFound = require(`../Commands/${cmdSearch.name}.js`);
            return cmdFound.run(Discord, client, message, args, db, serverinfo, dbcmd)
        } catch(Err) {

            if(Err.message === "Cannot read property 'manutenção' of undefined") return message.channel.send(new Discord.RichEmbed()
                .setTitle('⚠️ Ops!')
                .setDescription("Comando não encontrado! Use `.help` para ver a lista de comandos.")
                .setFooter("SkyBlack Network ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            ).then(msg => {msg.delete(15*1000); message.delete(15*1000)});

        }
    }
    
}