const router = require("koa-router")();
const fs = require("fs");
router.get("/", async (ctx, next) => {
  ctx.cookies.set("name", "zhangsan", {
    domain: "localhost", // 写cookie所在的域名
    path: "/", // 写cookie所在的路径
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date("2022-04-15"), // cookie失效时间
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false, // 是否允许重写
  });
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

// router.get("/string", async (ctx, next) => {
//   const username = ctx.cookies.get("name");
//   console.log(username);
//   ctx.body = "koa2 string";
// });

// router.get("/json", async (ctx, next) => {
//   ctx.body = {
//     title: "koa2 json",
//   };
// });

// // 作为路由主入口
// try {
//   fs.readdirSync(__dirname).forEach((file) => {
//     if (file !== "index.js") {
//       console.log(file);
//       const rt = require(`./${file}`);
//       router.use(rt.routes());
//     }
//   });
// } catch (error) {
//   console.log(error);
// }

module.exports = router;
