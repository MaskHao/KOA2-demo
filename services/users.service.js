const UserModel = require("./../model/user.model");
module.exports = {
  createUser: async (params) => {
    try {
      const data = await UserModel.create(params);
      return data;
    } catch (error) {
      return error || "service:createUser ERROR";
    }
  },
  getUserInfo: async (params) => {
    try {
      const data = await UserModel.findOne({
        attributes: ["id", "username", "password", "role"],
        where: {
          ...params,
        },
      });
      return data.dataValues || "";
    } catch (error) {
      return error || "service:getUserInfo ERROR";
    }
  },
  updateUser: async (params) => {
    const { id, password } = params;
    try {
      const res = await UserModel.update(
        { password },
        {
          where: {
            id,
          },
        }
      );
      return [false, true][res[0]];
    } catch (error) {
      console.log("updateUser>>>>>>>", error);
      return error || "service:updateUser ERROR";
    }
  },
};
