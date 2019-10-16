# 一键收藏书签至GitHub

### 准备

1. Fork该项目 

2. git clone 该项目

3. 清空 *bookmarks* 文件夹

4. `git remote set-url origin 你的新仓库地址`

5. `npm install nodemon -g`

6. `npm install`

### 添加书签

![截图](https://github.com/vectorzero/bookmark/blob/master/screen.png)

如图：添加一个新书签，命名为 *fav* ，网址内容如下：

```js
javascript: ((function(s, d, e) {window.open('http://localhost:3000/create?link=' + e(location.href) + '&title=' + e(d.title))})(screen, document, encodeURIComponent));
```

### 启动服务

`nodemon server.js` 或者双击 *start.bat*

点击 *fav* 即可同步收藏当前网站至GitHub
