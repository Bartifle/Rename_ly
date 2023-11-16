const { Events } = require("discord.js");
const Guild = require("../model/guild");

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        try {
            const gd = await Guild.create({
                id: guild.id,
                name: guild.name,
            });
            console.log(`Invited in the guild ${guild}`);
        } catch (error) {
            console.log(error);
        }
    },
};
