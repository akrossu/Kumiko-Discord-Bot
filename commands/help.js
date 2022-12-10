const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
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
        if (interaction.options.getString('category') === null) {
            dynamicEmbed.title = '📚 Help';
            dynamicEmbed.fields = [
                    { name: ':lotus: General', value: ' Some generic bot commands.', inline: true },
                    { name: ':person_pouting: Personal', value: 'Your discord and bot information.', inline: true },
                    { name: ':shinto_shrine: Anime', value: 'Lookup anime and discuss them with your friends!', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: ':wrench: Utility', value: 'Commands that provide statistical information.', inline: true },
                    { name: ':gear: Settings', value: 'Configuration tools for a custom experience.', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'ℹ Slash Commands', value: '*Kumiko makes use of slash commands now!* (`/` *instead of* `!k`)\n*Reminder that commands can be disabled or enabled in your* `Server Settings → Integrations → Kumiko`' }];
            const githubButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Visit the GitHub Repo')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/AKR0SS/Kumiko-Discord-Bot'),
            );
            return interaction.reply({
                embeds: [dynamicEmbed],
                components: [githubButton],
            });
        }
        else {
            switch (interaction.options.getString('category').toLowerCase()) {
                case 'general':
                    dynamicEmbed.title = ':lotus: General';
                    dynamicEmbed.description = 'Some generic bot commands.';
                    dynamicEmbed.fields = [
                        { name: '/help', value: 'Lists all categories and their commands.', inline: true },
                        { name: '/server', value: 'Displays guild information.', inline: true }];
                    break;
                case 'personal':
                    dynamicEmbed.title = ':person_pouting: Personal';
                    dynamicEmbed.description = 'Your discord and bot information.';
                    dynamicEmbed.fields = [
                        { name: '/user', value: 'Displays information about your discord acount!', inline: true }];
                    break;
                case 'anime':
                    dynamicEmbed.title = ':shinto_shrine: Anime';
                    dynamicEmbed.description = 'Lookup anime and discuss them with your friends!';
                    dynamicEmbed.fields = [];
                    break;
                case 'utility':
                    dynamicEmbed.title = ':wrench: Utility';
                    dynamicEmbed.description = 'Commands that provide statistical information.';
                    dynamicEmbed.fields = [
                        { name: '/info', value: 'Displays Kumiko\'s bot description!', inline: true },
                        { name: '/ping', value: 'Pings for the bot / API latency.', inline: true }];
                    break;
                case 'settings':
                    dynamicEmbed.title = ':gear: Settings';
                    dynamicEmbed.description = 'Configuration tools for a custom experience.';
                    dynamicEmbed.fields = [];
                    break;
            }
        }
        await interaction.reply({
            embeds: [dynamicEmbed],
        });
    },
};

const dynamicEmbed = {
    color: 0xF5B5C8,
    title: 'placeholder',
    description: 'Use `/help <category>` for further information about specific commands',
};