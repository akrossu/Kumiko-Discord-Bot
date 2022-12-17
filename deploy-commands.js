const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFolder = fs.readdirSync('./commands');

console.log('\n%s Reading command files at %s.', '\x1b[46m STARTED \x1b[0m', commandFolder);
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const folder of commandFolder) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		console.info(`%s %s ./commands/${folder}/${file}`, '\x1b[42m DEPLOY \x1b[0m', '\x1b[34m[FILE_PATH]\x1b[0m');
		commands.push(command.data.toJSON());
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log('\n%s Refreshing %i application (/) commands.', '\x1b[46m STARTED \x1b[0m', commands.length);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			// Routes.applicationCommands(clientId),
			// App Guild Command is for test deployment
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('%s Reloaded %i application (/) commands.\n', '\x1b[42m DEPLOY \x1b[0m', data.length);
	}
    catch (error) {
		console.error(error);
	}
})();
