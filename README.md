# 一键收藏书签至GitHub

### 准备

1. Fork该项目 

2. 清空 *bookmarks* 文件夹

3. `git remote set-url origin 你的新仓库地址`

4. `npm install nodemon -g`

5. `npm install`

### 添加书签

![截图](https://github.com/vectorzero/bookmark/blob/master/screen.png)

如图：添加一个新书签，命名为 *fav* ，网址内容如下：

```js
javascript: ((function(s, d, e) { var u = location; var f = 'http://localhost:3000/create?link=' + e(u.href) + '&title=' + e(d.title); function a() { if (!window.open(f, '', 'toolbar=0,status=0,resizable=1,width=700,height=450,left=' + (s.width - 700) / 2 + ',top=' + (s.height - 650) / 2)) u.href = f }; if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0); else a() })(screen, document, encodeURIComponent));
```

### 启动服务

`nodemon server.js` 或者双击 *start.bat*

点击 *fav* 即可同步收藏当前网站至GitHub