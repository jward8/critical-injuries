const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const { commandsToDelete } = require('../../config.json');
module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, process.env.GUILD_ID);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );


            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`♻️ Deleted command "${name}".`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited command "${name}".`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it's set to delete.`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Command "${name}" was registered.`);
            }
        }

        for (const commandId of commandsToDelete) {
            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.id === commandId
            );

            if (existingCommand) {
                await applicationCommands.delete(existingCommand.id);
                console.log(`♻️ Deleted command "${existingCommand.name}".`);
            }
        }
    } catch (error) {
        console.error(`Me There was an error: ${error}`);
    }
}