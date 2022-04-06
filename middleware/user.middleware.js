const {
  userFormateError,
  userAlreadyExited,
} = require("./../constant/error.type");
const bcrypt = require("bcryptjs");
const UsersService = require("./../services/users.service");
module.exports = {
  userValidator: async (ctx, next) => {
    const { username, password } = ctx.request.body;
    // 合法性
    if (!username || !password) {
      console.error("用户名或密码为空", ctx.request.body);
      ctx.app.emit("error", userFormateError, ctx);
      return;
    }
    await next();
  },
  verifyUser: async (ctx, next) => {
    const { username } = ctx.request.body;
    const findUser = await UsersService.getUserInfo({ username });
    if (findUser.length) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      return false;
    }
    await next();
  },
  //针对密码进行加密
  encryptPWD: async (ctx, next) => {
    const { password } = ctx.request.body;

    const salt = bcrypt.genSaltSync(10);
    // hash保存的是 密文
    const hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash;
    await next();
  },
};
