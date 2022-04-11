const {
  userFormateError,
  userAlreadyExited,
  userDoesNotExist,
  invalidPassword,
  userLoginError,
  tokenExpiredError,
  invalidToken,
  userDoesNotLogin,
} = require("./../constant/error.type");
const bcrypt = require("bcryptjs");
const UsersService = require("./../services/users.service");
const jwt = require("jsonwebtoken");
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
    try {
      const findUser = await UsersService.getUserInfo({ username });
      if (findUser) {
        ctx.app.emit("error", userAlreadyExited, ctx);
        return false;
      }
    } catch (error) {
      console.error("获取用户信息错误", err);
      ctx.app.emit("error", userRegisterError, ctx);
      return;
    }
    await next();
  },
  //针对密码进行加密
  encryptPwd: async (ctx, next) => {
    const { password } = ctx.request.body;

    const salt = bcrypt.genSaltSync(10);
    // hash保存的是 密文
    const hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash;
    await next();
  },
  verifyLogin: async (ctx, next) => {
    const { password, username } = ctx.request.body;
    try {
      const res = await UsersService.getUserInfo({ username });
      if (!res) {
        ctx.app.emit("error", userDoesNotExist, ctx);
        return;
      }
      if (!bcrypt.compareSync(password, res.password)) {
        ctx.app.emit("error", invalidPassword, ctx);
        return;
      }
    } catch (error) {
      console.error("verifyLogin", error);
      return ctx.app.emit("error", userLoginError, ctx);
    }
    await next();
  },
  auth: async (ctx, next) => {
    const { authorization } = ctx.request.header;
    if (!authorization) {
      return ctx.app.emit("error", userDoesNotLogin, ctx);
    }
    const token = authorization.replace("Bearer ", "");
    try {
      const res = jwt.verify(token, process.env.JWT_SECRET);
      ctx.state.user = res;
    } catch (err) {
      switch (err.name) {
        case "TokenExpiredError":
          console.error("token已过期", err);
          return ctx.app.emit("error", tokenExpiredError, ctx);
        case "JsonWebTokenError":
          console.error("无效的token", err);
          return ctx.app.emit("error", invalidToken, ctx);
      }
    }
    await next();
  },
};
