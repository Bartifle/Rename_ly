const NameList = require("../model/nameList");

const deleteNameRenameEvent = async (name) => {
    try {
        await NameList.destroy({
            where: {
                name: [name],
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteNameRenameEvent;
