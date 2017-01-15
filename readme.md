# TODO


## 简介
Todo的增删改基本功能，参考 [React Todo](http://todomvc.com/examples/react/#/)样式
使用语言：es6  
后台：koa2 + graphql + mongodb + gulp (ps:mongodb host:localhost, port: 27017)  
前端：React + Redux + cssnext + webpack2

---

## 基本命令
- 开发环境执行编译： npm run builddev
- 生产环境执行编译： npm run buildprod
- 测试： npm run tests
- 启动服务： npm start

---
## 项目结构

```
todos           # 项目根目录
├── build         # 目标目录
├── config        # webpack配置目录
├── node_modules
├── src/             # 源码目录
    ├── app         #  前端源码
        ├── actions    # 创建action函数目录
        ├── actionTypes    # 定义ActionType 
        ├── apis     # 请求后台graphql接口 
        ├── components  # 组件
        ├── config # 前端配置文件
        ├── reducers   # 响应Action
        ├── styles # 通用样式
        ├── app.js  # 
        ├── index.html
        └── routers.js # 路由
    └── server      #  后台源码
        ├── config  #  后台基本配置
        ├── controller # 路由 
        ├── data  # graphql目录，schema定义和resolver
        ├── models  # model定义
        └── app.js 
├── test          # 单测目录
├── gulpfile.js
├── package.json
├── postcss.config.js
└── wepback.config.js
```

## cssnext
该用cssnext需要postcss-loader来编译，用到cssnext的那些功能，就需要按照对应的postcss插件，比如：
```
:root {
  --firthColor: #f5f5f5;
  --secondColor: #4d4d4d;
}
body {
  background: var(--firthColor);
  color: var(--secondColor);
}
//上面是用到了自定义变量功能，就需要postcss-custom-properties

color(#000 a(0.2))//就得用到postcss-color-function

//还有一个要注意的就是嵌套规则，cssnext官网推荐的是postcss-nesting，但是在webpack配置后是不行的，后来我就改用了在postcss github 中找到的postcss-nested
```

