# Nuxt3-study

> 学习 Nuxt3

## 目的

- 更好的 SEO
- 更快的渲染速度（向浏览器投喂一个已经组织好的 html 文档，不需要浏览器再去解析复杂的 js 文件）

## ssr 两种方案

- 第一种是使用预渲染（Prerendering），在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。（这对在项目中需要 seo 部分完全静态的页面来说是非常高效的）
- 第二种是使用服务器端渲染（ssr）。需要开启一个 node 的服务，使用 vue-server-renderer 插件，把 vue 项目的内容动态渲染成一个 html 文档，返回给浏览器，达到了服务器渲染的目的。

## 对比 php 等传统 ssr

- php 等传统 ssr，每一次的页面跳转，浏览器都会获取到一个 html 文档，每次都进行页面重新渲染的操作，而且每次跳转都会伴随页面的闪烁，体验感非常不好。
- vue-ssr，保留单页面 spa 的优点，依旧向浏览器进行投喂一个组织好的 html 文档。首次访问的时候，浏览器会获取一个已经组织完成的 html 文档，而后续的页面切换操作，都是基于当前的 html 获取该路由下的组件 js，对页面进行动态渲染，就使用者体验来说，与单页面应用一致，使用者访问页面不存在多次渲染、闪烁的情况，而且也可以满足 seo 的要求。

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

使用 nginx 代理用户的访问域名到前端项目的启动 IP 和端口。

### 安装 node

```bash
  $ curl -sL https://rpm.nodesource.com/setup_10.x | bash -
  $ yum install -y nodejs
  $ node -v
```

### 本地打包

```bash
  $ npm run build
```

### 目录拷贝

- 拷贝打包生成的.output 至服务器部署目录

### 服务器执行

直接启动

```bash
  $ npm run start
```

通过 pm2 启动

```bash
  $ pm2 start .output/server/index.mjs
  # ===等价于===
  $ pm2 start npm --watch --name XXX -- run start ==> 本地：npm run start
```

通过 json 文件启动，项目根目录创建 pm2.json

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

```bash
$ cd /opt/deploy
$ pm2 start pm2.json
```

### nginx 代理

使用 nginx 做代理，将项目域名代理到 localhost:3000 ，启动 nginx 后可以访问域名看到项目

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

### pm2 守护进程

对于线上项目，如果不进行打包构建，而是直接通过 node app 来热启动，如果进程报错了可能直接导致整个服务崩溃停止。另外在终端窗口很多的情况下，容易产生误操作，难以管理。所以可以使用**pm2**来对**node 进程**进行批量管理操作

- 介绍
  **pm2**是一个带有负载均衡功能的 Node 应用的进程管理器，它会保证通过**pm2**启动的**node 进程**一致存活，永远杀不死。

- 示例
  [jishupang 教程](https://jspang.com/article/86#toc0)

* 安装

```bash
$ npm install pm2 -g
```

- 常用 pm2 指令

```bash

$ pm2 list                       # 列表 PM2 启动的所有的应用程序

$ pm2 monit                      # 查看仪表盘，显示每个应用程序的CPU和内存占用情况

$ pm2 start app.js               # 启动app.js应用程序

$ pm2 start app.js --name="demo" # 启动应用程序并命名为 "demo"
​
$ pm2 start app.js --watch       # 当文件变化时自动重启应用
​
$ pm2 start script.sh            # 启动 bash 脚本
​
$ pm2 show [app-name]            # 显示应用程序的所有信息
​
$ pm2 logs                       # 显示所有应用程序的日志
​
$ pm2 logs [app-name]            # 显示指定应用程序的日志
​
$ pm2 stop all                   # 停止所有的应用程序
​
$ pm2 stop 0                     # 停止id为 0的指定应用程序
​
$ pm2 restart all                # 重启所有应用
​
$ pm2 restart 0                  # 重启id为0的应用程序
​
$ pm2 delete all                 # 关闭并删除所有应用
​
$ pm2 delete 0                   # 删除指定应用 id 0
​
$ pm2 startup                    # 创建开机自启动命令
​
$ pm2 save                       # 保存当前应用列表

$ pm2 resurrect                 # 重新加载保存的应用列表
```

### 相关 Linux 命令

```bash
 $ lsof -i:3000 # 查看3000端口占用
 $ kill -9 XXX # SIGKILL：9号信号，Kill signal（杀死进程信号，linux规定进程不可以忽略这个信号）
```

### nuxt.js 官网

[Nuxt.js docs](https://nuxtjs.org).

### 掘金教程

[掘金教程](https://juejin.cn/post/7037336504418435103)

### jishupang 教程

[jishupang 教程](https://jspang.com/article/86#toc0)
