module.exports = {
    data: { name: 'anime-profile-next' },
    async execute(interaction) {
        await interaction.reply({ content: 'next was clicked' });
    },
};