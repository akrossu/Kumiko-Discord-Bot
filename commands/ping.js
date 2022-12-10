const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: '🏓 Pinging...', fetchReply: true }).then((msg) =>
			msg.edit({
				content: null,
				embeds: [
					{
					title: '🏓  Pong!',
					color: 0xE38271,
					fields: [
						{ name: 'WebSocket Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
						{ name: '\u200B', value: '\u200B', inline: true },
						{ name: 'API Latency', value: `${(Date.now() - msg.createdTimestamp) * -1}ms`, inline: true },
					],
					},
				],
			}),
		);
	},
};
