const fs = require('fs');

/**
 * @param {*} client
 *
 * Responsible for the creation of events dynamically
 * read from the Events folder
 */
module.exports = (client) => {
    client.eventHandler = async () => {
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`../../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            }
            else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    };
};