const { SlashCommandBuilder } = require("discord.js");

const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const jsonToDatabase = require("../../utils/jsonToDatabase");

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
            const event = interaction.options.getString("event_name");
            const file = interaction.options.getAttachment("file");
            const data = await fetch(file.url);
            const txt = data.text();
            const jsonData = (await txt).split("\r\n");
            const target = interaction.user;

            await jsonToDatabase(jsonData, interaction.guildId, event);

            await interaction.reply(
                `${target} You initiated an event campain called ${event}`
            );
        } catch (error) {
            console.log(error);
        }
    },
};
