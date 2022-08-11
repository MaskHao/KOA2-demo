const Koa = require("koa");

const router = require("koa-router")();
const views = require("koa-views");
const fs = require("fs");
const json = require("koa-json");
const onerror = require("koa-onerror");

// const bodyparser = require("koa-bodyparser");
const koaBody = require("koa-body");

const logger = require("koa-logger");

// koa-websocket是koa封装好的websocket功能
const websocket = require("koa-websocket");

// 配置项目
const process = require("./config/config.default");
console.log("porcess>>>>>>>", process.APP_PROT);

//路由
const index = require("./routes/index");

// 实例化一个ws服务
const app = websocket(new Koa());

// error handler
onerror(app);

// middlewares
// app.use(
//   bodyparser({
//     enableTypes: ["json", "form", "text"],
//   })
// );
app.use(koaBody());
app.use(json());
// app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);
// app.use(
//   views(__dirname + "/views", {
//     extension: "ejs",
//     // map: { html: "ejs" },  //html内部可写ejs
//   })
// );

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get("/", async (ctx) => {
  ctx.body = "欢迎";
});

// router.all("/websocket/:id", async (ctx) => {
//   let t = setInterval(function () {
//     let n = Math.random();
//     if (n > 0.3) {
//       let msg = JSON.stringify({ id: ctx.params.id, n: n });
//       ctx.websocket.send(msg);
//     }
//   }, 1000);
//   ctx.websocket.on("message", (msg) => {
//     console.log("前端发过来的数据：", msg);
//   });
//   ctx.websocket.on("close", () => {
//     console.log("前端关闭了websocket");
//   });
// });
app.ws.use(function (ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
});
app.ws.use(
  router.all("/test/:id", function (ctx) {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send("Hello World");
    ctx.websocket.on("message", function (message) {
      // do something with the message from client
      console.log(message);
    });
  })
);

// routes
// app.use(index.routes(), index.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  let status = 500;
  switch (err?.code) {
    case "10001":
      status = 400;
      break;
    case "10002":
      status = 409;
      break;
    default:
      status = 500;
  }
  ctx.status = status;
  console.log(err);
  ctx.body = err;
});

module.exports = app;
