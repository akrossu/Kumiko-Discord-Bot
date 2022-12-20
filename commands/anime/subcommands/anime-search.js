const { EmbedBuilder } = require('@discordjs/builders');
const malScraper = require('mal-scraper');

module.exports = {
    async animeSearch(interaction) {
        let data;
        let synopsis;

        try {
            data = await malScraper.getInfoFromName(interaction.options.getString('anime'), true);
        }
        catch (error) {
            console.log(`%s %s An error occured while awaiting a reply.\n${error}`, '\x1b[41m ERROR \x1b[0m', '\x1b[34m [anime-search.js] \x1b[0m');
            return interaction.reply('An error occured while processing your request.');
        }

        if (data.synopsis.length > 1021) { // mal rewrite text is 28 characters long
            synopsis = data.synopsis.substring(0, 1024 - 29);
            synopsis = synopsis.concat('...\n\n[Written by Mal Rewrite]');
        }
        else {
            synopsis = data.synopsis;
        }

        const embed = new EmbedBuilder()
            .setColor(0xF5B5C8)
            .setTitle(data.title)
            .setURL(data.url)
            .setThumbnail(data.picture)
            .setDescription(data.score + ` score (${data.scoreStats}) • ${data.type}`)
            .addFields(
                { name: 'Aired', value: `${data.premiered}`, inline: true },
                { name: 'status', value: `${data.status}`, inline: true },
                { name: 'episodes', value: `${data.episodes} episodes`, inline: true },
                { name: 'synopsis', value: synopsis },
            );

        await interaction.reply({ embeds: [embed] });
    },
};