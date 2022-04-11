const router = require("koa-router")();
const {
  register,
  getUserInfo,
  login,changePwd
} = require("./../controller/user.controller");
const {
  auth,
  userValidator,
  verifyUser,
  encryptPwd,
  verifyLogin,
} = require("./../middleware/user.middleware");

router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

router.post("/register", userValidator, verifyUser, encryptPwd, register);
router.post("/login", userValidator, verifyLogin, login);
router.post("/getUserInfo", getUserInfo);
router.patch("/changePwd", auth,encryptPwd, changePwd);
module.exports = router;
