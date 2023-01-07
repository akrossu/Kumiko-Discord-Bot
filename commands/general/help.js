const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, ButtonStyle, ComponentType } = require('discord.js');

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
        const message = await interaction.deferReply();
        let row;

        const embed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle('placeholder')
            .setDescription('Select from the buttons below for further information about command categories or use `/help <category>` for any specific needs.');

        row = checkCategory(interaction.options.getString('category'), embed);

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1800000 });
        collector.on('collect', async i => {
            row = checkCategory(i.customId, embed);

            await i.update({ embeds: [embed], components: [row] });
        });

        await interaction.editReply({ embeds: [embed], components: [row] });
    },
};

function checkCategory(category, embed) {
    switch (category) {
        case 'General':
            return getGeneralContent(embed);
        case 'Personal':
            return getPersonalContent(embed);
        case 'Anime':
            return getAnimeContent(embed);
        case 'Utility':
            return getUtilityContent(embed);
        case 'Settings':
            return getSettingsContent(embed);
        default:
            return getHomeContent(embed);
    }
}

function getHomeContent(embed) {
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
    return getHomeButtons();
}

function getGeneralContent(embed) {
    embed.setTitle(':lotus: General');
                embed.setDescription('Some generic bot commands.');
                embed.setFields(
                    { name: '/help', value: 'Lists all categories and their commands.', inline: true },
                    { name: '/server', value: 'Guild information.', inline: true });
    return getReturnButton();
}

function getPersonalContent(embed) {
    embed.setTitle(':person_pouting: Personal');
                embed.setDescription('Your discord and bot information.');
                embed.setFields(
                    { name: '/avatar', value: 'Your or a selected user\'s avatar.', inline: true },
                    { name: '/user', value: 'Information about your discord acount!', inline: true });
    return getReturnButton();
}

function getAnimeContent(embed) {
    embed.setTitle(':shinto_shrine: Anime');
    embed.setDescription('Lookup anime and discuss them with your friends!');
    embed.setFields(
        { name: '/anime info', value: 'Information for the best-match anime.', inline: true },
        { name: '/anime search', value: 'A list of related anime for a user to select from.', inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '/anime profile', value: 'Your MAL profile.', inline: true },
        { name: '/anime season', value: 'All anime within a certain season and year of a selected type.', inline: true },
        { name: '\u200B', value: '\u200B', inline: true });
    return getReturnButton();
}

function getUtilityContent(embed) {
    embed.setTitle(':wrench: Utility');
    embed.setDescription('Commands that provide statistical information.');
    embed.setFields(
        { name: '/info', value: 'Displays Kumiko\'s bot description!', inline: true },
        { name: '/ping', value: 'Pings for the bot / API latency.', inline: true });
    return getReturnButton();
}

function getSettingsContent(embed) {
    embed.setTitle(':gear: Settings');
    embed.setDescription('Configuration tools for a custom experience.');
    embed.setFields();
    return getReturnButton();
}

function getHomeButtons() {
    const generalBtn = new ButtonBuilder()
        .setCustomId('General')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: '🪷' });
    const personalBtn = new ButtonBuilder()
        .setCustomId('Personal')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: '🙎' });
    const animeBtn = new ButtonBuilder()
        .setCustomId('Anime')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: '⛩️' });
    const utilityBtn = new ButtonBuilder()
        .setCustomId('Utility')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: '🔧' });
    const settingsBtn = new ButtonBuilder()
        .setCustomId('Settings')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: '⚙️' });

    return new ActionRowBuilder().addComponents(generalBtn, personalBtn, animeBtn, utilityBtn, settingsBtn);
}

function getReturnButton() {
    const generalBtn = new ButtonBuilder()
        .setCustomId('HomeBtn')
        .setStyle(ButtonStyle.Secondary)
        .setLabel(' Return Home ');

    return new ActionRowBuilder().addComponents(generalBtn);
}