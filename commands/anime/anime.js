const { animeSearch } = require('./subcommands/anime-search.js');
const { animeSeason } = require('./subcommands/anime-season');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('anime')
        .addSubcommand(subcommand =>
            subcommand.setName('search')
                .setDescription('Search the mal database for a related anime')
                .addStringOption(option =>
                    option.setName('anime')
                        .setDescription('Anime title')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('season')
                .setDescription('List all of the airing anime in a particular season / year')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Type of media')
                        .addChoices(
                            { name: 'TVNew', value: 'TVNew' },
                            { name: 'TVCon', value: 'TVCon' },
                            { name: 'Movies', value: 'Movies' },
                            { name: 'OVAs', value: 'OVAs' },
                            { name: 'ONAs', value: 'ONAs' },
                            { name: 'Specials', value: 'Specials' },
                        )
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('season')
                        .setDescription('Season of the year.')
                        .addChoices(
                            { name: 'Spring', value: 'spring' },
                            { name: 'Summer', value: 'summer' },
                            { name: 'Fall', value: 'fall' },
                            { name: 'Winter', value: 'winter' },
                        )
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('year')
                        .setDescription('A year from recent.')
                        .setRequired(true))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'season') return animeSeason(interaction);
        if (interaction.options.getSubcommand() == 'search') return animeSearch(interaction);
    },
};