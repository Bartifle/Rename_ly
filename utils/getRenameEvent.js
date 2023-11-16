const NameList = require("../model/nameList");

const getRenameEvent = async (interaction) => {
    let eventArray = [];
    const eventList = await NameList.findAll({
        where: {
            guild_id: [interaction.guildId],
        },
    });
    eventList.map((event) => {
        if (!eventArray.includes(event.event_type)) {
            eventArray.push(event.event_type);
        }
    });

    return eventArray;
};

module.exports = getRenameEvent;
