const { EmbedBuilder } = require('@discordjs/builders');
const malScraper = require('mal-scraper');

module.exports = {
    async animeSearch(interaction) {
        const info = malScraper.getInfoFromName(interaction.options.getString('anime'), true);
        const data = await info;

        const embed = new EmbedBuilder()
            .setColor(0xF5B5C8)
            .setTitle(data.title)
            .setURL(data.url)
            .setThumbnail(data.picture)
            .setDescription(data.score + ` score (${data.scoreStats}) • ${data.type}`)
            .addFields(
                { name: 'status', value: `${data.status}`, inline: true },
                { name: 'episodes', value: `${data.episodes} episodes`, inline: true },
                { name: 'synopsis', value: data.synopsis },
            );
        await interaction.reply({ embeds: [embed] });
    },
};