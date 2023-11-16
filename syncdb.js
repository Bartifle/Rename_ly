const sequelize = require("./utils/database");
const Guild = require("./model/guild");
const NameList = require("./model/nameList");

// sequelize.sync({ alter: true });

// Guild.sync({ alter: true });
NameList.sync({ force: true });
