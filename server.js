const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const exec = require('child_process').exec;
const dayjs = require('dayjs');
const ora = require("ora");
const shell = require('shelljs');

app.use(async (ctx) => {
  const spinner = ora();
  let content = ctx.query;
  shell.exec('git pull', (code, stdout, stderr) => {
    spinner.text = '正在拉取GitHub上的变动！'
    spinner.start();
    if (code !== 0) {
      console.log(stderr);
      spinner.fail("拉取失败，请手动更新代码！");
      shell.exit(1);
    } else {
      spinner.succeed("拉取成功！");
      const fileName = `${dayjs().format('YYYY-MM')}.md`;
      const fileContent = `[${content.title}](${content.link})</br></br>`;
      fs.exists('bookmarks', (exists) => {
        !exists && fs.mkdirSync('bookmarks');
      })
      fs.appendFile(`bookmarks\\${fileName}`, fileContent, (error) => {
        error && ctx.throw(error);
        console.log('写入成功，正在同步至GitHub！');
        spinner.text = '正在同步中，请勿中断进程！';
        spinner.start();
        shell.exec(`git add . && git commit -m ${fileName} && git push -u origin master`, (multiCode, multiStdout, multiErr) => {
          if (multiCode !== 0) {
            console.log(multiErr)
            spinner.fail("同步失败！");
            shell.exit(1);
          } else {
            spinner.succeed("已完成同步！");
          }
        })
      })
    }
  })
  ctx.body = content;




  // shell.exec('git pull', (e, s) => {
  //   console.log(111)
  //   spinner.start();
  //   spinner.text = '正在拉取GitHub上的变动！'
  //   if (e) {
  //     console.log(222)
  //     console.log(e)
  //     spinner.fail("拉取失败，请手动更新代码！");
  //     return false;
  //   } else {
  //     console.log(333)
  //     spinner.succeed("拉取成功！");
  //     const fileName = `${dayjs().format('YYYY-MM')}.md`;
  //     const fileContent = `[${content.title}](${content.link})</br></br>`;
  //     fs.exists('bookmarks', (exists) => {
  //       !exists && fs.mkdirSync('bookmarks');
  //     })
  //     fs.appendFile(`bookmarks\\${fileName}`, fileContent, (error) => {
  //       error && ctx.throw(error);
  //       console.log('写入成功，正在同步至GitHub！');
  //       spinner.start();
  //       spinner.text = '正在同步中，请勿中断进程！'
  //       let execGit = exec(`git add . && git commit -m ${fileName} && git push -u origin master`, (err, stdout) => {
  //         console.log(444)
  //         if (err) {
  //           console.log(err)
  //           spinner.fail("同步失败！");
  //         } else {
  //           console.log(stdout)
  //           spinner.succeed("已完成同步！");
  //         }
  //         execGit.kill();
  //       })
  //     })
  //   }
  // })

})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});