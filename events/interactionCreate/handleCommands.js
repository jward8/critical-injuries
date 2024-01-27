const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if(process.env.DEVS !== interaction.member.id) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.testOnly) {
            if(!interaction.guild.id === process.env.TEST_SERVER) {
                interaction.reply({
                    content: 'This command cannot be ran here.',
                    ephemeral: true,
                });
                return;
            }
        }
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.error(`There was an error running this command: ${error}. at ${__filename}`);
    }
}