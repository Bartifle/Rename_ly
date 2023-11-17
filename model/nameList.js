const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const NameList = sequelize.define(
    "namelist",
    {
        name: Sequelize.STRING,
        guild_id: Sequelize.STRING,
        message_id: Sequelize.STRING,
        event_name: Sequelize.STRING,
    },
    { timestamps: false }
);

module.exports = NameList;
