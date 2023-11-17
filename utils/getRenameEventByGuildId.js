const NameList = require("../model/nameList");

const getRenameEventByGuildId = async (guildId) => {
    try {
        let eventArray = [];
        const eventList = await NameList.findAll({
            where: {
                guild_id: [guildId],
            },
        });
        eventList.map((event) => {
            if (!eventArray.includes(event.event_name)) {
                eventArray.push(event.event_name);
            }
        });

        return eventArray;
    } catch (error) {
        console.log(error);
    }
};

module.exports = getRenameEventByGuildId;
