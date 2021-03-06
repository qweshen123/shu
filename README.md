# 基于vue开发小说app

### 技术栈
vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass + flex + svg

### 项目运行
下载依赖库
```
npm install
```
运行项目
```
npm run serve
```

### 关于接口数据
[后台接口文档](https://github.com/jianhui1012/bookreader/wiki/API-%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3#23%E4%B9%A6%E7%B1%8D%E8%AF%A6%E6%83%85)

### 主要功能
#### 登录
#### 注册
#### 收藏小说
#### 分类
#### 搜索
#### 评论
#### 浏览小说

### 项目布局
```
├── public                                      // webpack配置文件
├── src                                         // 源码目录
│   ├── assets                                  // 组件
│   │   ├── images                              // 头像图片
│   │   │   ├── 7b9800.jpg                      // 图片
│   │   ├── js                                  // 自定义方法
│   │   │   ├── changtime.js                    // 更改时间显示格式
│   ├── components                              // 公共组件
│   │   ├── Blank.vue                           // 空白格组件
│   │   ├── Chapter.vue                         // 目录转跳组件
│   │   ├── Chapters.vue                        // 文章目录组件
│   │   ├── ClassHeader.vue                     // 页面头部组件
│   │   ├── Goditem.vue                         // 用户评论组件
│   │   ├── IndexIcon.vue                       // 搜索排名组件
│   │   ├── MineItem.vue                        // 用户个人选项组件
│   │   └── Tag.vue                             // 标签组件
│   ├── router                                  
│   │   ├── index.js                            // 路由配置
│   ├── store                                  
│   │   ├── action.js                           // 异步操作函数配置
│   │   ├── index.js                            // vuex配置
│   │   ├── mutation-type.js                    // 函数名
│   │   └── mutation.js                         // 函数方法
│   ├── utils                                  
│   │   ├── WebIM.js                            // 环信配置
│   │   └── WebIM.config.js                     // 环信配置
│   ├── views                                  
│   │   ├── bookcity                          
│   │   │   ├── directory
│   │   │   │   ├── BookTxt.vue                 // 内容页
│   │   │   │   └── Directiory.vue              // 目录页
│   │   │   ├── BookSingle.vue                  // 小说主页
│   │   │   ├── ClassBook.vue                   // 小说路由转跳
│   │   │   └── ClassNav.vue                     // 小说导航
│   │   ├── BookCity.vue                        // 书城主页
│   │   ├── Else.vue                        // 其他页面
│   │   ├── Female.vue                        // 女生页面
│   │   ├── Male.vue                           // 男生页面
│   │   └── Synthesize.vue                     // 综合页面
│   │   ├── community
│   │   │   ├── CommentDetails.vue                   // 评论详情主页
│   │   │   ├── CommentsItem.vue                   // 其他评论组件
│   │   │   └── Community.vue                     // 评论主页
│   │   ├── mine
│   │   │   ├── History.vue                   // 收藏组件
│   │   │   └── Mine.vue                     // 我的主页
│   │   ├── Login.vue                        // 登录主页
│   │   └── SearchContent.vue                // 搜索组件
│   ├── App.vue                              // 页面入口文件
│   ├── elementUi.config.js                  // 饿了么ui配置文件
│   ├── main.js                              // 程序入口文件
│   ├── vant.config.js                       // vant-ui配置文件
├── vue.config.js                            // vue配置(代理)
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##
修改
