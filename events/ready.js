const { author, version } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('\n',
        '/****************************************/\n',
        `/        ${client.user.username} v${version} is now Online       /\n`,
        `/            Created by ${author}           /\n`,
        '/****************************************/\n');
	},
};