const { SlashCommandBuilder } = require('discord.js');
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
			dynamicEmbed.title = 'User information';
			dynamicEmbed.thumbnail = { url: interaction.member.user.avatarURL() },
			dynamicEmbed.fields = [
				{ name: 'User', value: userMention(interaction.member.id), inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: 'Joined Discord', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true },
			];
		}
		else if (interaction.options.getUser('target').id === '595412974621949972') {
			joinedAt = new Date(interaction.options.getUser('target').createdAt);
			dynamicEmbed.title = 'What\'s this, a dedicated page just for the love of my life? yes <3';
			dynamicEmbed.thumbnail = { url: interaction.options.getUser('target').avatarURL() },
			dynamicEmbed.fields = [
				{ name: 'User', value: userMention(interaction.options.getUser('target').id), inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: 'Joined Discord', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true },
				{ name: 'A note to my love', value: 'Every moment of every passing hour you are on my mind. For I long to see you every second of the day and wish to hold you close every chance I get. The thoughts of you that fill my head are like no other I\'ve experienced. To think that someone so beautiful would have entered my life so early boggles my mind. I have thought many times over how stunning you are. By which I mean all of you, how wondrous your personality is which attracted me in the first place, to how absolutely stunningly gorgeous you are. I want to experience all the world has to offer with you, as my best friend and the love of my life.' },
			];
		}
		else {
			joinedAt = new Date(interaction.options.getUser('target').createdAt);
			dynamicEmbed.title = 'User information';
			dynamicEmbed.thumbnail = { url: interaction.options.getUser('target').avatarURL() },
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
    title: 'placeholder',
	thumbnail: 'placeholder',
};