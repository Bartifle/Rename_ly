const NameList = require("../model/nameList");

const deleteRenameEvent = async (guildId, eventName) => {
    try {
        await NameList.destroy({
            where: {
                guild_id: [guildId],
                event_name: [eventName],
            },
        });
        return eventName;
    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteRenameEvent;
