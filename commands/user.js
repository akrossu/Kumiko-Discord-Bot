const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { userMention } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('Profile of provided user'),
		),
	async execute(interaction) {
		let joinedAt;

		if (interaction.options.getUser('target') === null) {
			joinedAt = new Date(interaction.member.user.createdAt);
			dynamicEmbed.fields = [
				{ name: 'User', value: userMention(interaction.member.id), inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: 'Joined Discord', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true },
			];
		}
		else {
			joinedAt = new Date(interaction.options.getUser('target').createdAt);
			dynamicEmbed.fields = [
				{ name: 'User', value: userMention(interaction.options.getUser('target').id), inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: 'Joined Discord', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true },
			];
		}
		await interaction.reply({ embeds: [dynamicEmbed] });
	},
};

const dynamicEmbed = {
    color: 0xF5B5C8,
    title: 'User information',
};