# 懂球吗 - （后端项目）

## 项目介绍

基于Vue.js与Node.js的足球论坛数据系统

![](https://img.shields.io/badge/Node-4.0.0-green.svg)
![](https://img.shields.io/badge/cheerio-1.0.0-green.svg)
![](https://img.shields.io/badge/mysql-2.16-green.svg)
![](https://img.shields.io/badge/qiniu-7.2.1-green.svg)
![](https://img.shields.io/badge/socket.io-2.2.0-green.svg)
![](https://img.shields.io/badge/superagent-4.1.0-green.svg)

## 技术栈

前端: Vue全家桶，Element-UI,Echarts.js,Socket.io

后端: Node.js,Express,Socket.io

数据库: MongoDB, Redis

## 项目运行

``` bash
# 克隆项目
git clone git@github.com:mario528/Vue-football-pro-backend.git

# 进入后端项目
npm install / cnpm install

# 进入/model/database/MongoDB/mongodb_config.js 进行MongoDB数据库配置
# 进入/service/Crawler中，运行爬虫脚本
# 返回项目根目录 开启进程守护，运行后端项目
nodemon app.js

```
