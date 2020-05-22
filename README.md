# 局域网聊天室
koa + vue开发的局域网聊天室

支持群聊、文件传输、文件列表、聊天记录（本地存储文本文件模拟数据库）等模块

![effect](http://suohb.com/images/effect.png)



### 运行

```
cd client
npm insall // 安装依赖
npm run bulid // 构建静态文件


cd ../server
npm install // 安装依赖
npm run serve // 启动服务，默认在80端口

```

### 使用

 访问：http://localhost/html 使用聊天室

### 配置

* **服务端**

  ```javascript
  // server/config.js
  module.exports = {
      port: 80, // 后台服务端口
      staticPath: './static',
      uploadPath: './static/upload',
      dbPath: './db/data'
  }
  ```

  

* **客户端**

  ```javascript
  // client/src/config.js 
  export default {
      socketServer: 'http://localhost:80' // socket服务地址；局域网使用配置本机IP地址
  }
  ```

  
### 部署

使用pm2来管理node服务

  ```bat
  npm i -g pm2

  cd server 
  pm2 start app.js
  ```



如果是在window开发机器上部署，每次重启都需要启动node服务

我们可以将其配置到开机启动项里边

1. 按 Win + R 打开运行目录输入：shell:startup 进入启动项目录
2. 邮件新建txt文件，重命名问startup_chat.bat
3. 找到你项目存放的文件（我存在E盘 根目录下）
4. startup_chat.bat输入以下内容保存
```bat
E:
cd E:\chat\server
pm2 start app.js
```