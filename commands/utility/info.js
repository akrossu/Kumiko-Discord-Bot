const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, hyperlink, ButtonStyle } = require('discord.js');
const { version, author } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('View bot information.'),
    async execute(interaction) {
        const upTime = new Date(interaction.client.uptime);
        const upTimeCalc = Math.round((new Date().getTime() - upTime.getTime()) / 1000);
        const helpEmbed = new EmbedBuilder()
            .setColor(0xD68881)
            .setTitle('Kumiko Discord Bot v' + version)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { name: 'Author', value: hyperlink(author, 'https://github.com/AKR0SS'), inline: true },
                { name: 'Date Created', value: '<t:1670463360:d>', inline: true },
                { name: 'Up Time ', value: '<t:' + upTimeCalc + ':R>', inline: true },
                { name: 'A little about the bot', value: 'Kumiko is a complete rewrite of an discord bot I had used for various things. The aim of it\'s current version is to provide a dynamic and easy to use experience. I am excited to see where this journy takes not only the bot, but myself as well! Thank you for reading!' });

        const repoBtn = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Visit the GitHub Repo')
                .setStyle(ButtonStyle.Link)
                .setURL('https://github.com/AKR0SS/Kumiko-Discord-Bot'));

        await interaction.reply({ embeds: [helpEmbed], components: [repoBtn] });
    },
};