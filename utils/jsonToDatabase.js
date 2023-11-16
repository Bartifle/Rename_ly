const NameList = require("../model/nameList");

const jsonToDatabase = (nameList, guildId, eventType) => {
    nameList.map(async (name) => {
        await NameList.create({
            name: name,
            guild_id: guildId,
            event_type: eventType,
        });
    });
};

module.exports = jsonToDatabase;
