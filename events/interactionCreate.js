const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`%s No command matching ${interaction.commandName} was found.`, '\x1b[41m ERROR \x1b[0m');
			return;
		}

		try {
			if (interaction.isAutocomplete()) {
				console.log('args function');
				await command.autocomplete(interaction);
			}
			else {
				await command.execute(interaction);
			}
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};