const { EmbedBuilder } = require('@discordjs/builders');
const malScraper = require('mal-scraper');

module.exports = {
    async animeSeason(interaction) {
        const type = interaction.options.get('type').value;

        if (type == 'TVNew') getTVNew(interaction, type);
        if (type == 'TVCon') getTVCon(interaction, type);
        if (type == 'Movies') getMovies(interaction, type);
        if (type == 'OVAs') getOVAs(interaction, type);
        if (type == 'ONAs') getONAs(interaction, type);
        if (type == 'Specials') getSpecials(interaction, type);
    },
};


async function getTVNew(interaction, type) {
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;

    const data = malScraper.getSeason(year, season, type);

    await interaction.reply({ content: 'Retrieving List...', fetchReply: true }).then((msg) => {
        msg.edit({
            content: 'fetched TVNew',
        });
    });
}

async function getTVCon(interaction, type) {
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;

    const data = malScraper.getSeason(year, season, type);

    await interaction.reply({ content: 'Retrieving List...', fetchReply: true }).then((msg) => {
        msg.edit({
            content: 'fetched TVCon',
        });
    });
}

async function getMovies(interaction, type) {
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;

    const data = malScraper.getSeason(year, season, type);

    await interaction.reply({ content: 'Retrieving List...', fetchReply: true }).then((msg) => {
        msg.edit({
            content: 'fetched Movies',
        });
    });
}

async function getOVAs(interaction, type) {
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;

    const data = malScraper.getSeason(year, season, type);

    await interaction.reply({ content: 'Retrieving List...', fetchReply: true }).then((msg) => {
        msg.edit({
            content: 'fetched OVAs',
        });
    });
}

async function getONAs(interaction, type) {
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;

    const data = malScraper.getSeason(year, season, type);

    await interaction.reply({ content: 'Retrieving List...', fetchReply: true }).then((msg) => {
        msg.edit({
            content: 'fetched ONAs',
        });
    });
}

async function getSpecials(interaction, type) {
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;

    const data = malScraper.getSeason(year, season, type);

    await interaction.reply({ content: 'Retrieving List...', fetchReply: true }).then((msg) => {
        msg.edit({
            content: 'fetched Specials',
        });
    });
}

function formatletter(string) {
    return string[0].toUpperCase() + string.slice(1);
}