const sequelize = require("../db/seq");
const dayjs = require("dayjs");
const { DataTypes } = require("sequelize");
const user = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "人员姓名",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  role: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员, 0: 不是管理员(默认); 1: 是管理员",
  },
});

// user.sync();
module.exports = user;
