const UsersService = require("./../services/users.service");

const { userRegisterError } = require("./../constant/error.type");

const register = async (ctx, next) => {
  try {
    const data = await UsersService.createUser(ctx.request.body);
    ctx.body = {
      success: true,
      code: 200,
      data,
      message: "创建成功",
    };
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
  }
};
const getUserInfo = async (ctx, next) => {
  try {
    const info = await UsersService.getUserInfo(ctx.request.body);
    ctx.body = info;
  } catch (error) {
    ctx.body = error;
  }
};

module.exports = {
  register,
  getUserInfo,
};
