const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { userMention } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		const joinedAt = new Date(interaction.member.user.createdAt);
			const serverInfoEmbed = new EmbedBuilder()
				.setColor(0xE38271)
				.setTitle('User information')
				.setThumbnail(interaction.member.user.avatarURL())
				.addFields(
					{ name: 'User', value: userMention(interaction.member.id), inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
					{ name: 'Joined Discord', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true });
			await interaction.reply({ embeds: [serverInfoEmbed] });
	},
};
