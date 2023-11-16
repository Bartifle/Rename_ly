const { Events } = require("discord.js");
const Guild = require("../model/guild");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            console.log(`Ready! Logged in as ${client.user.tag}`);
            const guildList = await Guild.findAll({ attribute: ["id"] });

            console.log("Guild List :");
            guildList.map((g) => console.log(g.name));
        } catch (error) {
            console.log(error);
        }
    },
};
