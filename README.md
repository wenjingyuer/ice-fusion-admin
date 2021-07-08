
## 前言

> 为什么我要做这个项目呢，简单来说2个目的。一是为了沉淀。目前还是做了一些React的中后台管理项目，也发现了这些项目的一些共通性，可缺少一个沉淀的项目和机会。因此最近打算从零搭建一个React中后台管理项目启动模板，总结目前自己在已有项目中学到的优秀方法。另外可能会有盆友发现项目名称是曾相识，没错，是借鉴了[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)这个项目，可以说这个项目是Vue技术栈里最好的中后台管理模板了，当初这个项目极大的提高了我Vue的开发水平，这也就是我做这个项目的第二个原因，帮助新学习React技术栈的同学们。


## 使用
 项目开发文档请查看：https://www.yuque.com/docs/share/22e3a6fb-8e59-42b6-8db5-c754f00156d7

 持续开发中，完成后会整理发掘金，欢迎关注我的掘金 https://juejin.cn/user/3465262903073624
```bash
# 安装依赖
$ npm install

# 启动服务
$ npm start  # visit http://localhost:3333
```

[More docs](https://ice.work/docs/guide/about).

## 目录

```md
├── build/                         # 构建产物
├── mock/                          # 本地模拟数据
│   ├── index.[j,t]s
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── components/                # 自定义业务组件
│   │   └── Guide/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── pages/                     # 页面
│   │   └── index.tsx/
│   ├── global.scss                # 全局样式
│   └── app.[j,t]s[x]              # 应用入口脚本
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.[j,t]s
├── .gitignore
├── .stylelintignore
├── .stylelintrc.[j,t]s
├── .gitignore
└── [j,t]sconfig.json
```
