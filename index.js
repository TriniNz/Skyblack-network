const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('Database.json')
const db = low(adapter)

const cmdadapter = new FileSync('Commands/Commands.json')
const dbcmd = low(cmdadapter)

require('dotenv').config()

client.on('ready', () =>  {
    try {
        require('./Events/ready.js').run(Discord, client, db);
    } catch (err) {
        console.log(err + "\n\n Houve um erro no evento ready.")
    }
});

client.on('message', message => {
    try {
        require('./Events/message.js').run(Discord, client, message, db, dbcmd);
    } catch (err) {
        console.log(err + "\n\n Houve um erro no evento message.")
    }
});

client.on('raw', raw => {
    try {
        require('./Events/raw.js').run(Discord, client, raw, db);
    } catch (err) {
        console.log(err + "\n\n Houve um erro no evento raw.")
    }
});

client.login(process.env.Token)