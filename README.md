# 一键收藏书签至GitHub

### 添加以下内容至书签

```js
javascript: ((function(s, d, e) { var u = location; var f = 'http://localhost:3000/create?link=' + e(u.href) + '&title=' + e(d.title); function a() { if (!window.open(f, '', 'toolbar=0,status=0,resizable=1,width=700,height=450,left=' + (s.width - 700) / 2 + ',top=' + (s.height - 650) / 2)) u.href = f }; if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0); else a() })(screen, document, encodeURIComponent));
```

### 启动服务

`node server.js`