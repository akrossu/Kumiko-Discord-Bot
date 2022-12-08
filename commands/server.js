const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { userMention } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
			.setName('server')
			.setDescription('Provides information about the server.'),
		async execute(interaction) {
			const createdAt = new Date(interaction.guild.createdAt);
			const joinedAt = new Date(interaction.member.joinedAt);
			const serverInfoEmbed = new EmbedBuilder()
				.setColor(0xE38271)
				.setTitle(interaction.guild.name)
				.setThumbnail(interaction.guild.iconURL())
				.addFields(
					{ name: 'Owner', value: userMention(interaction.guild.ownerId) },
					{ name: 'Members', value: interaction.guild.memberCount + ' members' },
					{ name: 'Guild creation date ', value: '<t:' + Math.round(createdAt.getTime() / 1000) + ':d>', inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
					{ name: 'Member since ', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true });
			await interaction.reply({ embeds: [serverInfoEmbed] });
		},
};