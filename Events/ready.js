exports.run = async (Discord, client, db) => {

    setTimeout(() => console.log(`${client.user.username} OK! Ping: ${client.ping}ms.`), 3*1000)

    let status = [
        `Support: ${client.users.get("429825875467304960").tag}`,
        `Eu estou em fase beta! Pode haver muitos bugs.`,
        `Loja: ${db.get("Serverconfig").map("URLloja").value()[0]}`,
        `IP: ${db.get("Serverconfig").map("IP").value()[0]}`
    ]

    let randomSelect = Math.floor(Math.random() * status.length)

    client.user.setPresence({ status: "idle", game: {name: `${status[randomSelect]}`, type: "streaming", url: `https://www.twitch.tv/ztrininz_`}});

};