require('dotenv').config();
const mongoose = require('mongoose');

const { 
    Client,
    IntentsBitField,
    ActivityType
 } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB 🤖 ...")


        eventHandler(client);

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);

            client.user.setActivity('/roll-injury', { type: ActivityType.Watching }) 
        });

        client.login(process.env.DISCORD_TOKEN);
        console.log("Logged in Discord Bot! ...")
    } catch (error) {
        console.error(error);
    }
})();