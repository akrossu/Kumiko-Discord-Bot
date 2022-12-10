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
                    { name: 'Settings', value: 'Settings' },
                    { name: 'Custom-Commands', value: 'Custom-Commands' },
				)),
    async execute(interaction) {
        if (interaction.options.getString('category') === null) {
            dynamicEmbed.title = '📚 Help';
            dynamicEmbed.fields = [
                    { name: ':lotus: General', value: 'Default commands that provide statistical information.', inline: true },
                    { name: ':person_pouting: Personal', value: 'Your discord and bot information.', inline: true },
                    { name: ':shinto_shrine: Anime', value: 'Lookup anime and discuss them with your friends!', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: ':gear: Settings', value: 'Configuration tools for a custom experience.', inline: true },
                    { name: ':wrench: Custom Commands', value: 'Further customize your experience with custom commands!', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'ℹ Slash Commands', value: '*Kumiko makes use of slash commands now!* (`/` *instead of* `!k`)\n*Reminder that commands can be disabled or enabled in your* `Server Settings → Integrations → Kumiko`' }];
        }
        else {
            switch (interaction.options.getString('category').toLowerCase()) {
                case 'general':
                    dynamicEmbed.title = ':gear: General';
                    dynamicEmbed.description = 'General Commands';
                    dynamicEmbed.fields = [
                        { name: '/help', value: 'Lists all categories and their commands.', inline: true },
                        { name: '/info', value: 'Displays Kumiko\'s bot description!', inline: true },
                        { name: '/ping', value: 'Pings for the bot / API latency.', inline: true },
                        { name: '/server', value: 'Displays guild information.' }];
                    break;
                case 'personal':
                    dynamicEmbed.title = ':person_pouting: Personal';
                    dynamicEmbed.description = 'Personal Commands';
                    dynamicEmbed.fields = [
                        { name: '/user', value: 'Displays information about your discord acount!' }];
                    break;
                case 'anime':
                    dynamicEmbed.title = ':shinto_shrine: Anime';
                    dynamicEmbed.description = 'Anime Commands';
                    dynamicEmbed.fields = [];
                    break;
                case 'settings':
                    dynamicEmbed.title = ':gear: Settings';
                    dynamicEmbed.description = 'Settings Commands';
                    dynamicEmbed.fields = [];
                    break;
                case 'custom-commands':
                    dynamicEmbed.title = ':wrench: Custom Commands';
                    dynamicEmbed.description = 'Custom Command Settings';
                    dynamicEmbed.fields = [];
                    break;
            }
        }
        const githubButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Visit the GitHub Repo')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/AKR0SS/Kumiko-Discord-Bot'),
            );
        await interaction.reply({
            embeds: [dynamicEmbed],
            components: [githubButton],
        });
    },
};

const dynamicEmbed = {
    color: 0xF5B5C8,
    title: 'placeholder',
    description: 'Use `/help <category>` for further information about specific commands',
};