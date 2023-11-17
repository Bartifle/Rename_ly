const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const jsonToDatabase = require("../../utils/jsonToDatabase");

// TODO add model that stores message id in and eventList

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rename_event_initiate")
        .setDescription("Launch a rename event campain")
        .addStringOption((option) =>
            option
                .setName("event_name")
                .setDescription("Give a name to your event")
                .setRequired(true)
        )
        .addAttachmentOption((option) =>
            option
                .setName("file")
                .setDescription("Attach a file with your name list")
                .setRequired(true)
        ),

    async execute(interaction) {
        try {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("participate_rename_event")
                    .setLabel("Participate")
                    .setStyle(ButtonStyle.Secondary)
            );

            const event = interaction.options.getString("event_name");
            const file = interaction.options.getAttachment("file");
            const data = await fetch(file.url);
            const txt = data.text();
            const jsonData = (await txt).split("\r\n");
            const target = interaction.user;

            const replyMessage = await interaction.reply({
                content: `${target} You initiated an event campain called ${event} `,
                components: [row],
                fetchReply: true,
            });

            await jsonToDatabase(
                jsonData,
                interaction.guildId,
                replyMessage.id,
                event
            );
        } catch (error) {
            console.log(error);
        }
    },
};
