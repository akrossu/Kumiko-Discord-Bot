const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

module.exports = (client) => {
    client.componentHandler = async () => {
        // Stores the components read into a new collection
        client.buttons = new Collection();

        const componentFolder = readdirSync('./components');

        for (const folder of componentFolder) {
            const componentFiles = readdirSync(`./components/${folder}`).filter((file) => file.endsWith('.js'));
            const { buttons } = client;

            switch (folder) {
                case 'buttons':
                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${file}`);
                        buttons.set(button.data.name, button);
                    }
                    break;
                default:
                    console.error('no component found.');
                    break;
            }
        }
    };
};