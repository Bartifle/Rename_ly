const NameList = require("../model/nameList");

const randomNicknameRenameEvent = async (interaction) => {
    let nameArray = [];

    const nameList = await NameList.findAll({
        where: {
            guild_id: [interaction.guildId],
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
