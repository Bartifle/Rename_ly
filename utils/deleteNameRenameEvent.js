const NameList = require("../model/nameList");

const deleteNameRenameEvent = async (name, eventName, guildId) => {
    try {
        await NameList.destroy({
            where: {
                name: [name],
                event_name: [eventName],
                guild_id: [guildId],
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteNameRenameEvent;
