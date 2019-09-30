const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const exec = require('child_process').exec;
const dayjs = require('dayjs');
const ora = require("ora");

app.use(async (ctx) => {
  const spinner = ora();
  let content = ctx.query;
  exec('git pull', (e, s) => {
    console.log(111)
    spinner.start();
    spinner.text = '正在拉取GitHub上的变动！'
    if (e) {
      console.log(222)
      console.log(e)
      spinner.fail("拉取失败，请手动更新代码！");
      return false;
    } else {
      console.log(333)
      spinner.succeed("拉取成功！");
      const fileName = `${dayjs().format('YYYY-MM')}.md`;
      const fileContent = `[${content.title}](${content.link})</br></br>`;
      fs.exists('bookmarks', (exists) => {
        !exists && fs.mkdirSync('bookmarks');
      })
      fs.appendFile(`bookmarks\\${fileName}`, fileContent, (error) => {
        error && ctx.throw(error);
        console.log('写入成功，正在同步至GitHub！');
        spinner.start();
        spinner.text = '正在同步中，请勿中断进程！'
        let execGit = exec(`git add . && git commit -m ${fileName} && git push -u origin master`, (err, stdout) => {
          console.log(444)
          if (err) {
            console.log(err)
            spinner.fail("同步失败！");
          } else {
            console.log(stdout)
            spinner.succeed("已完成同步！");
          }
          execGit.kill();
        })
      })
    }
  })
  ctx.body = content;
})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});