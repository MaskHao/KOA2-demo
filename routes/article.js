const article = require("koa-router")();
article.prefix("/article");
article.get("/", async (ctx, next) => {
  let html = `
  <h1>koa2 request post demo</h1>
  <form method="POST" action="/article/form">
    <p>userName</p>
    <input name="userName" /><br/>
    <p>nickName</p>
    <input name="nickName" /><br/> 
    <button type="submit">submit</button>
  </form>
`;
  ctx.body = html;
  // await ctx.render("article", {
  //   title: "article",
  // });
});

article.post("/form", async (ctx, next) => {
  // const data = await parsePostData(ctx);
  // ctx.body = data;
  ctx.body = ctx.request.body;
}); 
module.exports = article;
