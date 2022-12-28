const { EmbedBuilder } = require('@discordjs/builders');
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

        const embed = new EmbedBuilder()
            .setColor(0xD68881);

        if (user === null) {
            embed.setTitle('Your avatar');
            embed.setImage(interaction.user.displayAvatarURL({ size: 2048 }));
        }
        else {
            embed.setTitle(user.username + '\'s avatar');
            embed.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));
        }

        return interaction.reply({ embeds: [embed] });
	},
};