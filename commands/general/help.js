const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('View command information.')
        .addStringOption(option =>
			option.setName('category')
				.setDescription('The gif category')
				.addChoices(
					{ name: 'General', value: 'General' },
					{ name: 'Personal', value: 'Personal' },
					{ name: 'Anime', value: 'Anime' },
                    { name: 'Utility', value: 'Utility' },
                    { name: 'Settings', value: 'Settings' },
				)),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle('placeholder')
            .setDescription('Use `/help <category>` for further information about specific commands');

        if (interaction.options.getString('category') === null) {
            embed.setTitle('📚 Help');
            embed.setFields(
                    { name: ':lotus: General', value: ' Some generic bot commands.', inline: true },
                    { name: ':person_pouting: Personal', value: 'Your discord and bot information.', inline: true },
                    { name: ':shinto_shrine: Anime', value: 'Lookup anime and discuss them with your friends!', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: ':wrench: Utility', value: 'Commands that provide statistical information.', inline: true },
                    { name: ':gear: Settings', value: 'Configuration tools for a custom experience.', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'ℹ Slash Commands', value: '*Kumiko makes use of slash commands now!* (`/` *instead of* `!k`)\n*Reminder that commands can be disabled or enabled in your* `Server Settings → Integrations → Kumiko`' });
            const githubButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Visit the GitHub Repo')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/AKR0SS/Kumiko-Discord-Bot'),
            );
            return interaction.reply({
                embeds: [embed],
                components: [githubButton],
            });
        }
        else {
            switch (interaction.options.getString('category').toLowerCase()) {
                case 'general':
                    embed.setTitle(':lotus: General');
                    embed.setDescription('Some generic bot commands.');
                    embed.setFields(
                        { name: '/help', value: 'Lists all categories and their commands.', inline: true },
                        { name: '/server', value: 'Displays guild information.', inline: true });
                        break;
                case 'personal':
                    embed.setTitle(':person_pouting: Personal');
                    embed.setDescription('Your discord and bot information.');
                    embed.setFields(
                        { name: '/avatar', value: 'Displays your or a selected user\'s avatar.', inline: true },
                        { name: '/user', value: 'Displays information about your discord acount!', inline: true });
                    break;
                case 'anime':
                    embed.setTitle(':shinto_shrine: Anime');
                    embed.setDescription('Lookup anime and discuss them with your friends!');
                    embed.setFields(
                        { name: '/anime search', value: 'Enter an anime name to search for it.' },
                        { name: '/anime season', value: 'Displays all anime within a certain season and year of a selected type.' });
                    break;
                case 'utility':
                    embed.setTitle(':wrench: Utility');
                    embed.setDescription('Commands that provide statistical information.');
                    embed.setFields(
                        { name: '/info', value: 'Displays Kumiko\'s bot description!', inline: true },
                        { name: '/ping', value: 'Pings for the bot / API latency.', inline: true });
                    break;
                case 'settings':
                    embed.setTitle(':gear: Settings');
                    embed.setDescription('Configuration tools for a custom experience.');
                    embed.setFields();
                    break;
            }
        }
        await interaction.reply({
            embeds: [embed],
        });
    },
};