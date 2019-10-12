const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const exec = require('child_process').exec;
const dayjs = require('dayjs');
const ora = require("ora");
const shell = require('shelljs');

app.use(async (ctx, next) => {
  let spinner = ora();
  let content = ctx.query;
  console.log('变动');
  spinner.text = '正在拉取GitHub上的变动！\n';
  spinner.start();
  shell.exec('git pull', (code, stdout, stderr) => {
    if (code !== 0) {
      spinner.text = stderr;
      spinner.fail("拉取失败，请手动更新代码！");
      shell.exit(1);
    } else {
      spinner.text = stdout;
      spinner.succeed("拉取成功！");
      const fileName = `${dayjs().format('YYYY-MM')}.md`;
      const fileContent = `[${content.title}](${content.link})</br></br>`;
      fs.exists('bookmarks', (exists) => {
        !exists && fs.mkdirSync('bookmarks');
      });
      fs.appendFile(`bookmarks\\${fileName}`, fileContent, (error) => {
        if (error) {
          console.log('文件内容写入失败，请重启程序！');
          return false;
        }
      });
      console.log('文件内容写入成功，正在同步至GitHub！');
      spinner.text = '正在同步中，请勿中断进程！\n';
      spinner.start();
      shell.exec(`git add . && git commit -m ${fileName} && git push -u origin master`, (multiCode, multiStdout, multiErr) => {
        console.log('执行命令');
        if (multiCode !== 0) {
          spinner.text = multiErr;
          spinner.fail("同步失败！");
          shell.exit(1);
        } else {
          spinner.text = multiStdout;
          spinner.succeed("已完成同步！");
        }
      })
    }
  });
  ctx.body = content;
});

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});