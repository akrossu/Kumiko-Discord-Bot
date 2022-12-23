const { animeSearch } = require('./subcommands/anime-search');
const { animeSeason } = require('./subcommands/anime-season');
const { animeProfile } = require('./subcommands/anime-profile');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('anime')
        // COMMAND: /anime search
        .addSubcommand(subcommand =>
            subcommand.setName('search')
                .setDescription('Search the mal database for a related anime')
                .addStringOption(option =>
                    option.setName('anime')
                        .setDescription('Anime title')
                        .setRequired(true)))
        // COMMAND: /anime season
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
                        .setRequired(true)))
        // COMMAND: /anime profile
        .addSubcommand(subcommand =>
            subcommand.setName('profile')
                .setDescription('Get the watch list for a user')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('A MAL username.')
                        .setRequired(true))),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'season':
                animeSeason(interaction);
                break;
            case 'search':
                animeSearch(interaction);
                break;
            case 'profile':
                animeProfile(interaction);
                break;
            default:
                console.log(`${interaction.options.getSubcommand()} was not found.`);
        }
    },
};