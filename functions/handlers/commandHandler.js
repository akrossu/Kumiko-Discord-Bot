const fs = require('fs');
const { Collection } = require('discord.js');

/**
 * @param {*} client
 *
 * Responsible for the instantiations and reading of commands
 * residing the Commands/command folder dynamically
 */
module.exports = (client) => {
    client.commandHandler = async () => {
        // Stores the commands read into a new collection
        client.commands = new Collection();

        const commandFolder = fs.readdirSync('./commands');

        for (const folder of commandFolder) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                // SET our instantiated collection obj in client commands and pass our command
                client.commands.set(command.data.name, command);
            }
        }
    };
};