module.exports = {
    data: { customId: 'anime-profile-prev' },
    async execute(interaction) {
        console.log(`${interaction.customId} was pressed`);
        await interaction.update({ content: 'prev was clicked' });
        // await interaction.update({ embeds: [embed], components: [row] });
    },
};