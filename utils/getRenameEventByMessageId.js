const NameList = require("../model/nameList");

const getRenameEventByMessageId = async (guildId, messageId) => {
    try {
        let eventArray = [];

        const eventList = await NameList.findAll({
            where: {
                guild_id: [guildId],
                message_id: [messageId],
            },
        });

        eventList.map((event) => {
            if (!eventArray.includes(event.event_name)) {
                eventArray.push(event.event_name);
            }
        });

        return eventArray[0];
    } catch (error) {
        console.log(error);
    }
};

module.exports = getRenameEventByMessageId;
