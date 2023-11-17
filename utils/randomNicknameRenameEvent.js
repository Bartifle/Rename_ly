const NameList = require("../model/nameList");

const randomNicknameRenameEvent = async (guildId, eventName) => {
    let nameArray = [];

    const nameList = await NameList.findAll({
        where: {
            guild_id: [guildId],
            event_name: [eventName],
        },
    });
    nameList.map((name) => {
        if (!nameArray.includes(name.name)) {
            nameArray.push(name.name);
        }
    });

    return nameArray[Math.floor(Math.random() * nameArray.length)];
};

module.exports = randomNicknameRenameEvent;
