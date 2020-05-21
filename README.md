# 局域网聊天室
koa + vue开发的局域网聊天室

支持群聊、文件传输、文件列表、聊天记录（本地存储文本文件模拟数据库）等模块

![effect](D:\study\socket\chat\readme\effect.png)



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

  

