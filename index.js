const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const functionFolder = fs.readdirSync('./functions');

client.commands = new Collection();

for (const folder of functionFolder) {
	const functionFiles = fs.readdirSync(`./functions/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

client.eventHandler();
client.commandHandler();

client.login(token);