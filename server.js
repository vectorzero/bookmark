const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const child_process = require('child_process');
const dayjs = require('dayjs');

app.use(async (ctx, next) => {
  if (ctx.url && ctx.method === 'GET') {
    let content = ctx.query;
    content.fileName = dayjs().format('YYYY-MM');
    content.date = dayjs().format('YYYY-MM-DD');
    const fileName = `${content.fileName}.md`;
    const fileContent = `[${content.title}](${content.link})</br></br>`;
    fs.appendFile(fileName, fileContent, function(err) {
      if (err) {
        ctx.throw(err)
      }
      console.log('写入成功');
      // git pull
      // git add .
      // git commit -m 'xxx'
      // git push -u origin master
      let subProcess = child_process.exec("git version", function(err, stdout) {
        if (err) console.log(err);
        console.log(stdout);
        subProcess.kill()
      });
    })
    ctx.body = content;
  }
})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});