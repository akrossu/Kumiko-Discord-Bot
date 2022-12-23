module.exports = {
    data: { customId: 'anime-profile-next' },
    async execute(interaction) {
        console.log(`${interaction.customId} was pressed`);
        await interaction.update({ content: 'next was clicked' });
        // await interaction.update({ embeds: [embed], components: [row] });
    },
};