const UsersService = require("./../services/users.service");
const jwt = require("jsonwebtoken");
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
const login = async (ctx, next) => {
  const { username } = ctx.request.body;
  try {
    const data = await UsersService.getUserInfo({ username });
    const { password, ...otherMsg } = data;
    ctx.body = {
      success: true,
      code: 200,
      data: {
        token: jwt.sign({ ...otherMsg }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        }),
      },
      message: "登录成功",
    };
  } catch (error) {
    ctx.app.emit("error", userAlreadyExited, ctx);
    return false;
  }
};

const changePwd = async (ctx, next) => {
  const { password } = ctx.request.body;
  console.log(ctx.state.user);
  const { id } = ctx.state.user;
  try {
    const changeState = await UsersService.updateUser({ id, password });
    ctx.body = {
      success: changeState,
      code: changeState ? 200 : "1007",
      message: `修改${changeState ? "成功" : "失败"}`,
    };
  } catch (error) {}
};
module.exports = {
  register,
  getUserInfo,
  login,
  changePwd,
};
