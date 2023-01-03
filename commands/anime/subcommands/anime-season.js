const { EmbedBuilder } = require('@discordjs/builders');
const malScraper = require('mal-scraper');

module.exports = {
    async animeSeason(interaction) {
        await interaction.deferReply('Loading...');

        const nextYear = new Date().getFullYear() + 1;
        const displayPerPage = 8;
        const synopsisLength = 150;

        const type = interaction.options.get('type').value;
        const season = interaction.options.get('season').value;
        const year = interaction.options.get('year').value;

        let data;
        let typeArray;

        try {
            data = await malScraper.getSeason(year, season, type);
            typeArray = malScraper.getSeason(year, season);
        }
        catch (error) {
            console.log('%s %s An error occured while awaiting a reply.', '\x1b[41m ERROR \x1b[0m', '\x1b[34m [anime-season.js] \x1b[0m');
            return interaction.editReply('An error occured while processing your request.');
        }

        if (year < 1917 || year > nextYear) return interaction.reply({ content: `Year must be between 1917 and ${nextYear}.` });

        let typeLength;

        switch (type) {
            case 'TVNew':
                typeLength = (await typeArray).TVNew.length;
                break;
            case 'TVCon':
                typeLength = (await typeArray).TVCon.length;
                break;
            case 'Movies':
                typeLength = (await typeArray).Movies.length;
                break;
            case 'OVAs':
                typeLength = (await typeArray).OVAs.length;
                break;
            case 'ONAs':
                typeLength = (await typeArray).ONAs.length;
                break;
            case 'Specials':
                typeLength = (await typeArray).Specials.length;
                break;
            default:
                return interaction.reply('A valid type was not identified.');
        }

        if (typeLength == 0) return interaction.reply({ content: `Can not find anime for ${season}, ${year}` });

        const embed = new EmbedBuilder()
            .setColor(0xF5B5C8)
            .setTitle(`${type} from ${season}, ${year}`)
            .setDescription('For further information about an anime, use `/anime info`')
            .setURL(`https://myanimelist.net/anime/season/${year}/${season}`);

        for (let i = 0; i < typeLength && i < displayPerPage; i++) {
            const animeInfo = malScraper.getInfoFromName(`${data[i].title}`, true);
            const animeData = await animeInfo;
            let synopsis;
            if (animeData.synopsis.length > synopsisLength) { // mal rewrite text is 28 characters long
                synopsis = animeData.synopsis.substring(0, synopsisLength - 29);
                synopsis = synopsis.concat('...\n');
            }
            else {
                synopsis = data.synopsis;
            }

            embed.addFields({ name: `${animeData.title}`, value: `${synopsis}`, inline: true });
            embed.addFields({ name: `User Rating: ${animeData.score} ★`, value: `[MyAnimeList Page](${animeData.url})\n${animeData.episodes} episodes\n${animeData.aired}`, inline: true });
            embed.addFields({ name: '\u200B', value: '\u200B', inline: true });
        }

        await interaction.editReply({ embeds: [embed] });
    },
};