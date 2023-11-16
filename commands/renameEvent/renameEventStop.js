const { SlashCommandBuilder } = require("discord.js");

const getRenameEvent = require("../../utils/getRenameEvent");
const deleteRenameEvent = require("../../utils/deleteRenameEvent");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rename_event_stop")
        .setDescription("Stop a rename event campain")
        .addStringOption((option) =>
            option
                .setName("event_name")
                .setDescription("Select the event you want to stop")
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async autocomplete(interaction) {
        try {
            const eventArray = await getRenameEvent(interaction);
            await interaction.respond(
                eventArray.map((choice) => ({ name: choice, value: choice }))
            );
        } catch (error) {
            console.log(error);
        }
    },

    async execute(interaction) {
        try {
            const eventName = await deleteRenameEvent(interaction);
            await interaction.reply(
                `You successfully stoped ${eventName} event!`
            );
        } catch (error) {
            console.log(error);
        }
    },
};
