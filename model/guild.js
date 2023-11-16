const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Guild = sequelize.define("guild", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: Sequelize.STRING,
});

module.exports = Guild;
