require('dotenv').config();
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { ButtonStyle, ComponentType } = require('discord.js');
const Taki = require('taki');

const LIMIT = 8;
const SYNOPSISLENGTH = 150;
const animeData = [];

let seasonData;

async function getAnimeSeason(interaction) {
    const taki = new Taki(process.env.CLIENT_KEY);
    const season = interaction.options.get('season').value;
    const year = interaction.options.get('year').value;
    return await taki.getSeason(season, year, LIMIT);
}

async function getData(id) {
    const taki = new Taki(process.env.CLIENT_KEY);
    return await taki.getAnimeInfo(id);
}

module.exports = {
    async animeSeason(interaction) {
        const message = await interaction.deferReply();

        const season = interaction.options.get('season').value;
        const year = interaction.options.get('year').value;

        const nextYear = new Date().getFullYear() + 1;

        if (year < 1917 || year > nextYear) return interaction.reply({ content: `Year must be between 1917 and ${nextYear}.` });

        seasonData = await getAnimeSeason(interaction);
        await populate();

        const embed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle(`${season}, ${year}`)
            .setDescription('For further information about an anime, use `/anime info`')
            .setURL(`https://myanimelist.net/anime/season/${year}/${season}`);

        const previousBtn = new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('<')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const nextBtn = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('>')
            .setStyle(ButtonStyle.Secondary);

        if (!seasonData.paging.next) nextBtn.setDisabled(true);

        updatePage(embed);

        // Updater
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1800000 });
        collector.on('collect', async i => {
            const taki = new Taki(process.env.CLIENT_KEY);
            let pagingURI;

            if (i.customId === 'prev' && seasonData.paging.previous != null) {
                nextBtn.setDisabled(false);
                pagingURI = seasonData.paging.previous;
            }
            else if (i.customId === 'next' && seasonData.paging.next != null) {
                previousBtn.setDisabled(false);
                pagingURI = seasonData.paging.next;
            }

            seasonData = await taki.paginate(pagingURI);
            await populate();
            await updatePage(embed);

            // repeat null check for button disable
            if (seasonData.paging.previous == null) previousBtn.setDisabled(true);
            else if (seasonData.paging.next == null) nextBtn.setDisabled(true);

            await i.update({ embeds: [embed], components: [row] });
        });

        const row = new ActionRowBuilder().addComponents(previousBtn, nextBtn);
        await interaction.editReply({ embeds: [embed], components: [row] });
    },
};

function getUrl(id) {
    const URL = 'https://myanimelist.net/anime/';
    return URL.concat(id);
}

async function populate() {
    for (let i = 0; i < LIMIT; i++) {
        if (!seasonData.data[i]) continue;
        animeData[i] = await getData(seasonData.data[i].node.id);
    }
}

async function updatePage(embed) {
    embed.setFields();

    for (let i = 0; i < LIMIT; i++) {
        if (!seasonData.data[i]) continue;

        let synopsis;
        if (animeData[i].synopsis.length > SYNOPSISLENGTH) { // mal rewrite text is 28 characters long
            synopsis = animeData[i].synopsis.substring(0, SYNOPSISLENGTH - 29);
        }
        else {
            synopsis = animeData[i].synopsis.substring(0, animeData[i].synopsis.length - 29);
        }
        synopsis = synopsis.concat('...\n');

        embed.addFields({ name: '\u200B',
            value: `[**${animeData[i].title}**](${getUrl(animeData[i].id)})\n${synopsis}`,
            inline: true });
        embed.addFields({ name: '\u200B',
            value: `User Rating: ${animeData[i].mean} ★\n${animeData[i].num_episodes} episodes`,
            inline: true });
        embed.addFields({ name: '\u200B', value: '\u200B', inline: true });
    }
}