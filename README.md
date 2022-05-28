# my-nuxt

> 学习nuxt.js

## 目的
- 更好的SEO
- 更快的渲染速度（向浏览器投喂一个已经组织好的html文档，不需要浏览器再去解析复杂的js文件）

## ssr两种方案
- 第一种是使用预渲染（Prerendering），在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。（这对在项目中需要seo部分完全静态的页面来说是非常高效的）
- 第二种是使用服务器端渲染（ssr）。需要开启一个node的服务，使用vue-server-renderer插件，把vue项目的内容动态渲染成一个html文档，返回给浏览器，达到了服务器渲染的目的。

## 对比php等传统ssr
- php等传统ssr，每一次的页面跳转，浏览器都会获取到一个html文档，每次都进行页面重新渲染的操作，而且每次跳转都会伴随页面的闪烁，体验感非常不好。
- vue-ssr，保留单页面spa的优点，依旧向浏览器进行投喂一个组织好的html文档。首次访问的时候，浏览器会获取一个已经组织完成的html文档，而后续的页面切换操作，都是基于当前的html获取该路由下的组件js，对页面进行动态渲染，就使用者体验来说，与单页面应用一致，使用者访问页面不存在多次渲染、闪烁的情况，而且也可以满足seo的要求。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# 查看目录（打包构建不会生成像vue脚手架一样的dist目录，而是.nuxt目录）
$ ls -lf

# generate static project
$ npm run generate
```

## 服务器部署（nginx）
使用nginx代理用户的访问域名到前端项目的启动IP和端口。
### 安装node
```bash
  $ curl -sL https://rpm.nodesource.com/setup_10.x | bash -
  $ yum install -y nodejs
  $ node -v
```

### 拷贝文件
- 本地执行
```bash
  $ npm run build
```
- 拷贝下面的文件至服务器部署目录
  - 打包生成的：.nuxt
  - 项目本身的：static、nuxt.config.js、package.json、pm2.json

### 服务器执行npm install
```bash
  $ npm install
  $ npm run start
```

### nginx代理
使用nginx做代理，将项目域名代理到localhost:3000上面
```bash
server {
    listen 80;
    server_name www.test.com;
    
    location / {
        root /opt/deploy; # 前端文件目录
        proxy_pass http://127.0.0.1:3000;
    }
    
}
```
启动nginx后可以访问域名看到项目

### pm2守护进程
对于线上项目，如果直接通过 node app来启动，如果报错了可能直接停止导致整个服务崩溃，我们可以使用pm2对node进程管理
- 安装
```bash
$ npm install pm2 -g
```
- 项目根目录创建pm2.json
```bash
[
  {
    "name": "demo",
    "script": "npm run start",
    "env_dev": {
      "NODE_ENV": "development"
    },
    "env_production": {
      "NODE_ENV": "production"
    }
  }
]
```
- 启动pm2
```bash
$ cd /opt/deploy
$ pm2 start pm2.json
```
- 常用pm2指令
```bash
$ pm2 start app.js               # 启动app.js应用程序
​
$ pm2 start app.js --name="demo"  # 启动应用程序并命名为 "demo"
​
$ pm2 start app.js --watch       # 当文件变化时自动重启应用
​
$ pm2 start script.sh            # 启动 bash 脚本
​
$ pm2 list                       # 列表 PM2 启动的所有的应用程序
​
$ pm2 show [app-name]            # 显示应用程序的所有信息
​
$ pm2 logs                       # 显示所有应用程序的日志
​
$ pm2 logs [app-name]            # 显示指定应用程序的日志
​
$ pm2 stop all                   # 停止所有的应用程序
​
$ pm2 stop 0                     # 停止 id为 0的指定应用程序
​
$ pm2 restart all                # 重启所有应用
​
$ pm2 restart 0                  # 重启id为0 的应用程序
​
$ pm2 delete all                 # 关闭并删除所有应用
​
$ pm2 delete 0                   # 删除指定应用 id 0
​
$ pm2 startup                    # 创建开机自启动命令
​
$ pm2 save                       # 保存当前应用列表
```

### nuxt.js官网 
[Nuxt.js docs](https://nuxtjs.org).



