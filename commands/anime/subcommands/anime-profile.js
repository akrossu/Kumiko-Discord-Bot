const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle, ComponentType } = require('discord.js');
const Taki = require('taki');

const TOTAL_RESULTS = 8;
let PAGE = 1;

async function getWatchList(username) {
    const taki = new Taki(process.env.CLIENT_KEY);
    const dataObj = await taki.getWatchList(username, TOTAL_RESULTS);
    return dataObj;
}

module.exports = {
    async animeProfile(interaction) {
        const message = await interaction.deferReply();

        const username = interaction.options.getString('username');
        let dataObj = await getWatchList(username);

        // Total Page
        // Current Page

        // Embed Builder
        const embed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle(`${username}'s profile`)
            .setDescription('Displays all user\'s anime alphabetically and in the order: \n`watching > completed > on-hold > dropped > plan-to-watch`')
            .setURL(`https://myanimelist.net/profile/${username}`)
            .setFooter({ text: `page ${PAGE} of ${0}` });

        const previousBtn = new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('<')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const nextBtn = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('>')
            .setStyle(ButtonStyle.Secondary);

        // Populate initial page load
        await updatePage(embed, dataObj);

        // Updater
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1800000 });
        collector.on('collect', async i => {
            // TODO: dataObj.paging.next && dataObj.paging.previous when !null
            const taki = new Taki(process.env.CLIENT_KEY);
            let pagingURI;

            if (i.customId === 'prev' && dataObj.paging.previous != null) {
                PAGE--;
                nextBtn.setDisabled(false);
                pagingURI = dataObj.paging.previous;
            }
            else if (i.customId === 'next' && dataObj.paging.next != null) {
                PAGE++;
                previousBtn.setDisabled(false);
                console.log('previous false');
                pagingURI = dataObj.paging.next;
            }

            // repeat null check for button disable
            if (dataObj.paging.previous == null) previousBtn.setDisabled(true);
            else if (dataObj.paging.next == null) nextBtn.setDisabled(true);

            dataObj = await taki.paginate(pagingURI);
            await updatePage(embed, dataObj);

            await i.update({ embeds: [embed], components: [row] });
        });

        // Reply
        const row = new ActionRowBuilder().addComponents(previousBtn, nextBtn);
        await interaction.editReply({ embeds: [embed], components: [row] });
    },
};

function getURL(id) {
    return `https://myanimelist.net/anime/${id}`;
}

let dataArr = [];
async function getListData(dataObj) {
    dataArr = [];
    for (let i = 0; i < TOTAL_RESULTS; i++) {
        const taki = new Taki(process.env.CLIENT_KEY);
        dataArr.push(await taki.getAnimeInfo(dataObj.data[i].node.id));
    }
}

async function updatePage(embed, dataObj) {
    embed.setFields();
    await getListData(dataObj);

    for (let i = 0; i < TOTAL_RESULTS; i++) {
        embed.addFields({ name: `${dataObj.data[i].node.title}`, value: `[MyAnimeList Page](${getURL(dataArr[i].id)})\nAired: ${dataArr[i].start_date}\nEpisode(s): ${dataArr[i].num_episodes}`, inline: true });
        embed.addFields({ name: '\u200B', value: '\u200B', inline: true });
        embed.addFields({ name: `User Rating: ${dataArr[i].mean} ★`, value: `Status: ${dataArr[i].status.replaceAll('_', ' ') }`, inline: true });
    }
    embed.setFooter({ text: `page ${PAGE} of ${0}` });
}