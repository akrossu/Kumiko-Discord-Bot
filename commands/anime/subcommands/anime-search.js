const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle, ComponentType } = require('discord.js');
const malScraper = require('mal-scraper');
const search = malScraper.search;

module.exports = {
    async animeSearch(interaction) {
        const message = await interaction.deferReply();

        const type = 'anime';
        const searchTerm = interaction.options.getString('anime');

        let paginate = 0;
        let currentPage = 1;
        let totalPages = 1;

        let data;

        try {
            data = await search.search(type, { term: searchTerm });
        }
        catch (error) {
            console.log('%s %s An error occured while awaiting a reply.', '\x1b[41m ERROR \x1b[0m', '\x1b[34m [anime-search.js] \x1b[0m');
            return interaction.editReply('An error occured while processing your request.');
        }

        totalPages = Math.floor(data.length / 8);

        const embed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle(`Results for ${searchTerm}`)
            .setDescription('For further information about an anime, use `/anime info`');

        updatePage(embed, data, paginate);
        embed.setFooter({ text: `page ${currentPage} of ${totalPages}` });

        const previousBtn = new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('<')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const nextBtn = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('>')
            .setStyle(ButtonStyle.Secondary);

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1800000 });
        collector.on('collect', async i => {
            if (i.customId === 'prev' && currentPage > 1) {
                currentPage--;
                paginate -= 8;
                nextBtn.setDisabled(false);
            }
            else if (i.customId === 'next' && currentPage < totalPages) {
                currentPage++;
                paginate += 8;
                previousBtn.setDisabled(false);
            }

            if (currentPage === 1) { previousBtn.setDisabled(true); }
            if (currentPage === totalPages) { nextBtn.setDisabled(true); }

            updatePage(embed, data, paginate);
            embed.setFooter({ text: `page ${currentPage} of ${totalPages}` });

            await i.update({ embeds: [embed], components: [row] });

        });

        const row = new ActionRowBuilder().addComponents(previousBtn, nextBtn);

        await interaction.editReply({ embeds: [embed], components: [row] });
    },
};

function updatePage(embed, data, paginate) {
    // Empties all embed fields for new ones to be added
    embed.setFields();
    for (let i = paginate; i < paginate + 8; i++) {
        embed.addFields({ name: `${data[i].title}`, value: isValid(data[i].shortDescription), inline: true });
        embed.addFields({ name: '\u200B\u200B', value: '\u200B\u200B', inline: true });
        embed.addFields({ name: `${data[i].score} ★`, value: `[MyAnimeList Page](${data[i].url})\n${data[i].nbEps} episode(s)\n${data[i].startDate}`, inline: true });
    }
}

function isValid(description) {
    if (!description) {
        return '\u200B';
    }
    else {
        return description;
    }
}