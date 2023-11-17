const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const randomNicknameRenameEvent = require("../utils/randomNicknameRenameEvent");
const deleteNameRenameEvent = require("../utils/deleteNameRenameEvent");
const getRenameEventByMessageId = require("../utils/getRenameEventByMessageId");
const renameUser = require("../utils/renameUser");

const participateRenameEventHandler = async (interaction) => {
    const eventName = await getRenameEventByMessageId(
        interaction.message.guildId,
        interaction.message.id
    );

    if (eventName != null) {
        let newName = await randomNicknameRenameEvent(
            interaction.message.guildId,
            eventName
        );

        const confirmBtn = new ButtonBuilder()
            .setCustomId("confirm")
            .setLabel("Confirm")
            .setStyle(ButtonStyle.Success);

        const rerollBtn = new ButtonBuilder()
            .setCustomId("reroll")
            .setLabel("Reroll")
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(confirmBtn, rerollBtn);

        const response = await interaction.reply({
            content: `${interaction.user} your event Nickname will be ${newName}, you can reroll once or confirm the choice!`,
            components: [row],
            fetchReply: true,
        });

        const collectorFilter = (i) => i.user.id === interaction.user.id;

        const confirmation = await response.awaitMessageComponent({
            filter: collectorFilter,
        });

        if (confirmation.customId === "confirm") {
            const status = await renameUser(interaction, newName);
            if (status == "OK") {
                await confirmation
                    .update({
                        content: `${interaction.user} your event Nickname will be ${newName}!`,
                        components: [],
                    })
                    .then(
                        deleteNameRenameEvent(
                            newName,
                            eventName,
                            interaction.message.guildId
                        )
                    );
            } else {
                await confirmation.update({
                    content: `${status}`,
                    components: [],
                });
            }
        } else if (confirmation.customId === "reroll") {
            newName = await randomNicknameRenameEvent(
                interaction.message.guildId,
                eventName
            );
            const status = await renameUser(interaction, newName);
            if (status == "OK") {
                await confirmation
                    .update({
                        content: `${interaction.user} You rerolled for the christmas event, your Nickname is now : ${newName}!`,
                        components: [],
                    })
                    .then(
                        deleteNameRenameEvent(
                            newName,
                            eventName,
                            interaction.message.guildId
                        )
                    );
            } else {
                await confirmation.update({
                    content: `${status}`,
                    components: [],
                });
            }
        }
    } else {
        await interaction.reply(
            "There is no name for this event or the event is closed"
        );
    }
};

module.exports = participateRenameEventHandler;
