const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(
                    interaction.commandName
                );

                if (!command) {
                    console.error(
                        `No command matching ${interaction.commandName} was found.`
                    );
                    return;
                }

                try {
                    await command.execute(interaction);
                } catch (error) {
                    console.error(`Error executing ${interaction.commandName}`);
                    console.error(error);
                }
            } else if (interaction.isAutocomplete()) {
                const command = interaction.client.commands.get(
                    interaction.commandName
                );

                if (!command) {
                    console.error(
                        `No command matching ${interaction.commandName} was found.`
                    );
                    return;
                }

                try {
                    await command.autocomplete(interaction);
                } catch (error) {
                    console.error(error);
                }
            } else if (interaction.isButton()) {
                //TODO respond to the button
            } else if (interaction.isStringSelectMenu()) {
                //TODO respond to the select menu
            }
        } catch (error) {
            console.log(error);
        }
    },
};