const dotenv = require("dotenv");
const path = require("path");
// 环境变量配置
const envConfigPath = {
  dev: path.resolve(__dirname, "../.env.dev"), // 开发环境配置
  uat: path.resolve(__dirname, "../.env.uat"), // 测试环境配置
  prod: path.resolve(__dirname, "../.env.prod"), // 正式环境配置
};

dotenv.config({
  path: envConfigPath[process.env.NODE_ENV || "dev"], // 配置文件路径
}).parsed;

// console.log(process.env.APP_PORT)

module.exports = process.env;
