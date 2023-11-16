const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

const getRenameEvent = require("../../utils/getRenameEvent");
const randomNicknameRenameEvent = require("../../utils/randomNicknameRenameEvent");
const deleteNameRenameEvent = require("../../utils/deleteNameRenameEvent");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rename_event_participate")
        .setDescription("Launch a rename event campain")
        .addStringOption((option) =>
            option
                .setName("event_name")
                .setDescription("Select the event you want to participate")
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
            const target = interaction.user;

            let newName = await randomNicknameRenameEvent(interaction);

            const confirmBtn = new ButtonBuilder()
                .setCustomId("confirm")
                .setLabel("Confirm")
                .setStyle(ButtonStyle.Success);

            const rerollBtn = new ButtonBuilder()
                .setCustomId("reroll")
                .setLabel("Reroll")
                .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder().addComponents(
                confirmBtn,
                rerollBtn
            );

            const response = await interaction.reply({
                content: `${target} your event Nickname will be ${newName}, you can reroll once or confirm the choice!`,
                components: [row],
            });

            const confirmation = await response.awaitMessageComponent();

            if (confirmation.customId === "confirm") {
                await confirmation
                    .update({
                        content: `${target} your event Nickname will be ${newName}!`,
                        components: [],
                    })
                    .then(deleteNameRenameEvent(newName));
            } else if (confirmation.customId === "reroll") {
                newName = await randomNicknameRenameEvent(interaction);
                await confirmation
                    .update({
                        content: `${target} You rerolled for the christmas event, your Nickname is now : ${newName}!`,
                        components: [],
                    })
                    .then(deleteNameRenameEvent(newName));
            }
        } catch (error) {
            await interaction.editReply(error);
        }
    },
};
