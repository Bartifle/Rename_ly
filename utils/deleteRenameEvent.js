const NameList = require("../model/nameList");

const deleteRenameEvent = async (interaction) => {
    try {
        await NameList.destroy({
            where: {
                guild_id: [interaction.guildId],
                event_type: [interaction.options.getString("event_name")],
            },
        });
        return interaction.options.getString("event_name");
    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteRenameEvent;
