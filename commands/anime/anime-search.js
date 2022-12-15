const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const malScraper = require('mal-scraper');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('anime')
	.setDescription('anime')
	.addSubcommand(subcommand =>
		subcommand
			.setName('search')
			.setDescription('search')
			.addStringOption(option => option.setName('anime').setDescription('The user').setRequired(true)),
    ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'search') {
            const info = malScraper.getInfoFromName(interaction.options.getString('anime'), true);
            const data = await info;
            let synopsis;

            if (data.synopsis.length > 1021) { // mal rewrite text is 28 characters long
                synopsis = data.synopsis.substring(0, 1024 - 29);
                synopsis = synopsis.concat('...\n\n[Written by Mal Rewrite]');
            }
            else {
                synopsis = data.synopsis;
            }

            const embed = new EmbedBuilder()
                .setColor(0xF5B5C8)
                .setTitle(data.title)
                .setURL(data.url)
                .setThumbnail(data.picture)
                .setDescription(data.score + ` score (${data.scoreStats}) • ${data.type}`)
                .addFields(
                    { name: 'status', value: `${data.status}`, inline: true },
                    { name: 'episodes', value: `${data.episodes} episodes`, inline: true },
                    { name: 'synopsis', value: synopsis },
                );
            await interaction.reply({ embeds: [embed] });
        }
    },
};