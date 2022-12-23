const { SlashCommandBuilder } = require('discord.js');
const { userMention, EmbedBuilder } = require('@discordjs/builders');
const { wife } = require('../../config.json');

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

		const embed = new EmbedBuilder()
			.setColor(0xD68881)
			.setTitle('User information');

		if (interaction.options.getUser('target') === null) {
			joinedAt = new Date(interaction.member.user.createdAt);

			embed.setThumbnail(interaction.member.user.avatarURL());
			embed.addFields({ name: 'User', value: userMention(interaction.member.id), inline: true });
			getEmbedFields(embed, joinedAt);
		}
		else if (interaction.options.getUser('target').id === `${wife}`) { // A special command for my darling <3
			joinedAt = new Date(interaction.options.getUser('target').createdAt);

			embed.setTitle('What\'s this, a dedicated page just for the love of my life? yes <3');
			embed.setThumbnail(interaction.options.getUser('target').avatarURL());
			embed.addFields({ name: 'User', value: userMention(interaction.options.getUser('target').id), inline: true });
			getEmbedFields(embed, joinedAt);
			embed.addFields({ name: 'A note to my love', value: 'Every moment of every passing hour you are on my mind. For I long to see you every second of the day and wish to hold you close every chance I get. The thoughts of you that fill my head are like no other I\'ve experienced. To think that someone so beautiful would have entered my life so early boggles my mind. I have thought many times over how stunning you are. By which I mean all of you, how wondrous your personality is which attracted me in the first place, to how absolutely stunningly gorgeous you are. I want to experience all the world has to offer with you, as my best friend and the love of my life.' });
		}
		else {
			joinedAt = new Date(interaction.options.getUser('target').createdAt);

			embed.setThumbnail(interaction.options.getUser('target').avatarURL());
			embed.addFields({ name: 'User', value: userMention(interaction.options.getUser('target').id), inline: true });
			getEmbedFields(embed, joinedAt);
		}

		await interaction.reply({ embeds: [embed] });
	},
};

function getEmbedFields(embed, joinedAt) {
	embed.addFields({ name: '\u200B', value: '\u200B', inline: true });
	embed.addFields({ name: 'Joined Discord', value: '<t:' + Math.round(joinedAt.getTime() / 1000) + ':d>', inline: true });
}