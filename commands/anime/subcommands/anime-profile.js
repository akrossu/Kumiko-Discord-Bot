const { EmbedBuilder } = require('@discordjs/builders');
const malScraper = require('mal-scraper');

module.exports = {
    async animeProfile(interaction) {
        await interaction.deferReply('Loading...');

        const type = 'anime';
        const paginate = 25;

        let data;

        try {
            data = await malScraper.getWatchListFromUser(interaction.options.getString('username'), paginate, type);
        }
        catch (error) {
            console.log(`%s %s An error occured while awaiting a reply.\n${error}`, '\x1b[41m ERROR \x1b[0m', '\x1b[34m [anime-search.js] \x1b[0m');
            return interaction.reply('An error occured while processing your request.');
        }

        const embed = new EmbedBuilder()
            .setColor(0xF5B5C8)
            .setTitle('Watch list')
            .setDescription('description')
            .setURL('https://myanimelist.net/');

        for (let i = 0; i < 8; i++) {
            embed.addFields({ name: `${data[i].animeTitle}`, value: `[MyAnimeList Page](${getURL(data[i])})\nAired: ${data[i].animeStartDateString}\n${data[i].animeNumEpisodes} episodes`, inline: true });
            embed.addFields({ name: `User Rating: ${data[i].score} ★`, value: `Status: ${getStatus(data[i])}`, inline: true });
            embed.addFields({ name: '\u200B', value: '\u200B', inline: true });
        }

        await interaction.editReply({ embeds: [embed] });
    },
};

function getURL(nData) {
    const id = nData.animeId;
    const name = nData.animeTitle.replaceAll(' ', '_');
    return `https://myanimelist.net/anime/${id}/${name}`;
}

function getStatus(nData) {
    switch (nData.status) {
        case 1:
            return 'Watching';
        case 2:
            return 'Completed';
        case 3:
            return 'On-hold';
        case 4:
            return 'Dropped';
        case 6: // idk where status 5 is /shrug
            return 'Plan-to-watch';
    }
}