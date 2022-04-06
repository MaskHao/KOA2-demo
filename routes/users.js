const router = require("koa-router")();
const { register, getUserInfo } = require("./../controller/user.controller");
const {
  userValidator,
  verifyUser,
  encryptPWD,
} = require("./../middleware/user.middleware");

router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

router.post("/register", userValidator, verifyUser,encryptPWD, register);
router.post("/getUserInfo", getUserInfo);
module.exports = router;
