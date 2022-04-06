const development_env = require("./development");
const production_env = require("./production");

module.exports = {
  development: development_env,
  production: production_env,
}[process.env.NODE_ENV || "development"];
