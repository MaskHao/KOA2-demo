const router = require("koa-router")();
const {
  register,
  getUserInfo,
  login,
} = require("./../controller/user.controller");
const {
  userValidator,
  verifyUser,
  encryptPWD,
  verifyLogin,
} = require("./../middleware/user.middleware");

router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

router.post("/register", userValidator, verifyUser, encryptPWD, register);
router.post("/login", userValidator, verifyLogin, login);
router.post("/getUserInfo", getUserInfo);
module.exports = router;
