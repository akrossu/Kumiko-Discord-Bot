const { Events } = require('discord.js');
const { author, version } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log('\n',
        '/****************************************/\n',
        `/       ${client.user.username} v${version} is now Online      /\n`,
        `/            Created by ${author}           /\n`,
        '/****************************************/\n');
	},
};
