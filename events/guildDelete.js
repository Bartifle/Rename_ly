const { Events } = require("discord.js");
const Guild = require("../model/guild");

module.exports = {
    name: Events.GuildDelete,
    async execute(guild) {
        try {
            const gd = await Guild.destroy({ where: { id: guild.id } });
            console.log(`Kicked from the guild ${guild}`);
            console.log(gd);
        } catch (error) {
            console.log(error);
        }
    },
};
