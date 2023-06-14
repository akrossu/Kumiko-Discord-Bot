require('dotenv').config();
const { EmbedBuilder } = require('@discordjs/builders');
const Taki = require('taki');

/**
 * ERRORS
 * request "86" returns undefined
 *  - request "\86" returnss successful
 */

async function getSearchData(interaction) {
    const taki = new Taki(process.env.CLIENT_KEY);
    return await taki.searchAnime(interaction.options.getString('anime'));
}

async function getData(id) {
    const taki = new Taki(process.env.CLIENT_KEY);
    return await taki.getAnimeInfo(id);
}

module.exports = {
    async animeInfo(interaction) {
        let data;
        let synopsis;

        try {
            const searchData = await getSearchData(interaction);
            data = await getData(searchData.data[0].node.id);

            // TODO: if invalid messaage is returned throw error to be caught
        }
        catch (error) {
            console.log(`%s %s An error occured while awaiting a reply.\n${error}`, '\x1b[41m ERROR \x1b[0m', '\x1b[34m [anime-info.js] \x1b[0m');
            return interaction.reply('An error occured while processing your request.');
        }

        if (data.synopsis.length > 1021) { // mal rewrite text is 28 characters long
            synopsis = data.synopsis.substring(0, 1024 - 29);
        }
        else {
            synopsis = data.synopsis.substring(0, data.synopsis.length - 29) + ' . . .';
        }

        const embed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle(data.title)
            .setURL(getUrl(data.id))
            .setThumbnail(data.picture)
            .setDescription((data.mean).toFixed(2) + ` score (Scored by ${data.num_scoring_users} users) • ${(data.media_type).toUpperCase()}`)
            .addFields(
                { name: 'Aired', value: `${data.start_season.season + ' ' + data.start_season.year}`, inline: true },
                { name: 'Status', value: `${data.status.replaceAll('_', ' ')}`, inline: true },
                { name: 'Episodes', value: `${data.num_episodes} episodes`, inline: true },
                { name: 'Synopsis', value: synopsis },
            );

        await interaction.reply({ embeds: [embed] });
    },
};

function getUrl(id) {
    const URL = 'https://myanimelist.net/anime/';
    return URL.concat(id);
}