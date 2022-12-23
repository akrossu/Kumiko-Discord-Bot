const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display your or a targeted user\'s avatar')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Displays a targeted user\'s avatar'),
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
	if (user) {
            dynamicEmbed.title = user.username + '\'s avatar';
            dynamicEmbed.image = { url: user.displayAvatarURL({ dynamic: true, size: 2048 }) };
            return interaction.reply({ embeds: [dynamicEmbed] });
        }

        dynamicEmbed.title = 'Your avatar';
        dynamicEmbed.image = { url: interaction.user.displayAvatarURL({ size: 2048 }) };
        await interaction.reply({ embeds: [dynamicEmbed] });
	},
};

const dynamicEmbed = {
    color: 0xF5B5C8,
    title: 'placeholder',
    image: { url: 'https://i.imgur.com/AfFp7pu.png' },
};
