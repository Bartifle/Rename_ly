const NameList = require("../model/nameList");

const jsonToDatabase = (nameList, guildId, messageId, eventName) => {
    nameList.map(async (name) => {
        await NameList.create({
            name: name,
            guild_id: guildId,
            message_id: messageId,
            event_name: eventName,
        });
    });
};

module.exports = jsonToDatabase;
