const fs = require('node:fs');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Establishes the Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Reads each of the Javascript files from Functions folder
const functionFolder = fs.readdirSync('./functions');

for (const folder of functionFolder) {
	if (folder === 'deploy-commands.js') continue;
	const functionFiles = fs.readdirSync(`./functions/${folder}`).filter(file => file.endsWith('.js'));

	// Reads and passes client to required Handlers
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

// Creates and handles execution of javascript files from the Events folder
client.eventHandler();
// Creates and sets commands read from the Commands/command folders
client.commandHandler();

client.login(token);