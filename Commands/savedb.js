const PastebinAPI = require('pastebin-js')
require('dotenv').config()

exports.run = async (Discord, client, message, args, db, serverinfo) => {

    let TokenAPI = process.env.TokenPastebin

        
        if(message.author.id !== "429825875467304960") {
            return message.channel.send(new Discord.RichEmbed()
                .setFooter("⚠️ Ops! O DevMode está ativado, apenas o desenvolvedor pode usar comandos.")
                .setColor(serverinfo.map('color').value()[0])
            ).then(msg => msg.delete(15*3000))
        }

        var time = Date().split(/ +/g);

        let pastebin = new PastebinAPI({
            'api_dev_key' : TokenAPI,
        });
        
    pastebin.createPasteFromFile("Database.json", `Backup - DataBase • ${time[2]} de ${time[1]}, ${time[3]}, ás ${time[4]}`, null, 1, "N")
        .then(function (data) {
            message.channel.send(new Discord.RichEmbed()
                .setTitle('📥 Backup.')
                .setDescription("Backup executado com sucesso. Enviei em sua DM.")
                .setFooter(serverinfo.map('clientName').value() + " ©️ IP: " + serverinfo.map('IP').value(), message.guild.iconURL)
                .setColor(serverinfo.map('color').value()[0])
            ).then(msg => msg.delete(15*1000))

            message.author.send("Backup database. "+ data)
            console.log("Backup DM: " + data);
        })
        .fail(function (err) {
            console.log(err);
        });

}