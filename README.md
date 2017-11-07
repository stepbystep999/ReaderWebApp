
WebApp阅读器篇
==============
由Koa、Vue、Zepto等框架结合HTML5开发的一个包含阅读器功能的书城App。
整个过程分为几个比较复杂的模块进行开发、如阅读器、书城首页、搜索模块。

常用知识点
------------

* ES6的Promise对象：用来传递异步操作的消息，充当异步和回调的中介，免除重复繁琐的回调函数嵌套
* HTML5的localStorage：用来做客户端存储，如存储用户所看的文章的ID或者阅读习惯
* ajax：发送请求获得数据后结合Vue对数据做渲染
* transform属性: 页面滑动
* 触屏事件: touchstart、touchmove、touchend

收益
------------

通过这个项目，从一个产品的技术选型到设计流程到代码的编写到测试上线，让我明白了一个产品制作的流程。写阅读器这一模块的代码时，让我有种感觉到麻雀虽少但五脏俱全的感觉，从页面结构到数据交互都有所涉及，让我明白前后端之间的数据是怎么交互的。我认识到在写代码的时候分模块来开发真的很重要，一个自己觉得复杂的功能，当认真去细化成一个个小模块时，问题自然迎刃而解，并且后期维护起来更有条理。最后，不得不承认我是个菜鸟，还需要努力好好去探索，努力走向全栈工程师这条路。


完成功能
-------
  - [x] 书城首页
  - [x] 书籍详情页
  - [x] 各类频道页
  - [x] 阅读器
  - [x] 搜索功能
  - [ ] 个人中心
  - [ ] 频道切换
  - [ ] 性能优化

目录
-------
  * mock: 模拟数据,充当数据库的作用
  * service: 读取数据,充当前后端的纽带。大部分数据是通过mock读取，少部分真实数据是直接发起http请求去获取。
  * static: 静态资源
  * view: ejs模板
  * app.js: 项目入口
  * package.json: 项目所需依赖

项目依赖
-------
  * koa: 基于Node.js平台的web开发框架
  * koa-route: 用来设置路由
  * koa-static-server: 提供静态资源服务
  * co-views: 用来设置模板引擎
  * ejs: ejs模板引擎
  

项目展示
-------
  - Thank you to see [me](http://reader666.applinzi.com)! Look better on the phone!
 
运行项目
-------
```
  $ git clone https://github.com/sinner77/webApp-reader.git
  $ cd webApp-reader
  $ npm install
  $ node app.js
```

有问题反馈
----
在使用中有任何问题，欢迎反馈给我
