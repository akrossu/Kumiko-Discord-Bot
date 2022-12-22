module.exports = {
    data: { name: 'anime-profile-prev' },
    async execute(interaction) {
        await interaction.reply({ content: 'previous was clicked' });
    },
};