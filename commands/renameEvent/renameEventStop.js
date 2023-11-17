const { SlashCommandBuilder } = require("discord.js");

const getRenameEventByGuildId = require("../../utils/getRenameEventByGuildId");
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
            const eventArray = await getRenameEventByGuildId(
                interaction.guildId
            );
            await interaction.respond(
                eventArray.map((choice) => ({ name: choice, value: choice }))
            );
        } catch (error) {
            console.log(error);
        }
    },

    async execute(interaction) {
        try {
            const eventName = interaction.options.getString("event_name");
            const responseName = await deleteRenameEvent(
                interaction.guildId,
                eventName
            );
            await interaction.reply(
                `You successfully stoped ${responseName} event!`
            );
        } catch (error) {
            console.log(error);
        }
    },
};
