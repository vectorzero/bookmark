const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const exec = require('child_process').exec;
const dayjs = require('dayjs');

app.use(async (ctx) => {
  if (ctx.url && ctx.method === 'GET') {
    let content = ctx.query;
    const fileName = `${dayjs().format('YYYY-MM')}.md`;
    const fileContent = `[${content.title}](${content.link})</br></br>`;
    fs.exists('bookmarks', (exists) => {
      !exists && fs.mkdirSync('bookmarks');
    })
    fs.appendFile(`bookmarks\\${fileName}`, fileContent, function(error) {
      if (error) {
        ctx.throw(error)
      }
      console.log('写入成功');
      console.log('正在同步至GitHub中...请勿退出该进程！');
      let execGit = exec(`git pull && git add . && git commit -m ${fileName} && git push -u origin master`, (err, stdout) => {
        if (err) console.log(err);
        console.log(stdout);
        console.log('已完成同步至GitHub！');
        execGit.kill();
      })
    })
    ctx.body = content;
  }
})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});