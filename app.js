const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const fs = require("fs");
const json = require("koa-json");
const onerror = require("koa-onerror");
// const bodyparser = require("koa-bodyparser");
const koaBody = require("koa-body");
const logger = require("koa-logger");

const process = require("./config/config.default");
console.log("porcess>>>>>>>", process.APP_PROT);

//路由
const index = require("./routes/index");
const users = require("./routes/users");
const article = require("./routes/article");
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

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(article.routes(), article.allowedMethods());

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
