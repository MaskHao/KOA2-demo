const UserModel = require("./../model/user.model");
module.exports = {
  createUser: async (params) => {
    try {
      const data = await UserModel.create(params);
      return data;
    } catch (error) {
      throw "error";
    }
  },
  getUserInfo: async (params) => {
    try {
      const data = await UserModel.findAll({
        where: {
          ...params,
        },
      });
      return data || [];
    } catch (error) {
      throw "error";
    }
  },
};
