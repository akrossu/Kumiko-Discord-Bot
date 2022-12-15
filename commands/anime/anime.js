const { animeSearch } = require('./subcommands/anime-search.js');
const { animeSeason } = require('./subcommands/anime-season');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('anime')
        .addSubcommand(subcommand =>
            subcommand
                .setName('search')
                .setDescription('search')
                .addStringOption(option => option.setName('anime').setDescription('The user').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('season')
                .setDescription('season')
                .addStringOption(option => option.setName('anime').setDescription('The user').setRequired(true))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'season') return animeSeason(interaction);
        if (interaction.options.getSubcommand() == 'search') return animeSearch(interaction);
    },
};