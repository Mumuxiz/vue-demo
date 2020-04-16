# vue-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#  项目目录结构说明
    public/      // --项目静态资源(打包后不进行压缩等处理)
    
    .env         // --项目测试环境相关路径等配置(可选)
    
    .env.production   // --项目生产环境相关路径配置(可选)
    
    .vue.config.js    // --项目环境配置(可选)
    
    src/api/     // --项目接口文档
    
    src/assets/config.scss   // --项目全局样式变量，已在vue.config.js中全局引入
    
    src/assets/common.scss   // --项目公共样式
    
    src/assets/ui-cover.scss  // --覆盖ui框架样式
    
    src/components/    // --项目ui组件(无逻辑，无接口)
    
    src/utils/    // --项目公共工具方法
    
    src/views/    //项目页面，按功能模块(或一级菜单)生成相应文件夹和相对应的主页面
    eg: 
    src/views/login    // --登录模块
    src/views/login/Login.vue   // --登录页面
    src/views/login/module      // --登录模块相关的功能组件(可选)
    src/views/login/dialog      // --登录模块相关的弹框(可选)

# 开发规范
### 1、文件命令规范
在web项目中，所有的文件名应该遵循同一命名约定

所有字母均用小写，单词间使用减号"-"连接。

### 2、css命令规范
#### 样式组件
{component-name}-ui    // --例： sms-code-ui
#### 功能组件
{component-name}-component  // --例: record-component

### 3、js命名规范
#### 变量命名: 小驼峰命名方式
    let myName = 'Tom'

#### 常量命名： 所有字母均大写，单词间使用下划线"_"连接
    const DEFAULT_NAME = 'baidu'
 
