const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const exec = require('child_process').exec;
const dayjs = require('dayjs');

app.use(async (ctx, next) => {
  if (ctx.url && ctx.method === 'GET') {
    let content = ctx.query;
    content.fileName = dayjs().format('YYYY-MM');
    content.date = dayjs().format('YYYY-MM-DD');
    const fileName = `${content.fileName}.md`;
    const fileContent = `[${content.title}](${content.link})</br></br>`;
    fs.appendFile(fileName, fileContent, function(error) {
      if (error) {
        ctx.throw(error)
      }
      console.log('写入成功');
      let execGit = exec(`git pull && git add . && git commit -m ${fileName} && git push -u origin master`, (err, stdout) => {
        if (err) console.log(err);
        console.log(stdout);
        execGit.kill();
      })
    })
    ctx.body = content;
  }
})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});