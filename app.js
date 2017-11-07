var koa = require('koa');
var controller = require('koa-route');
var app = koa();
var querystring = require('querystring');

//设置模板引擎
var views = require('co-views');

//设置模板存放路径和要使用的模板引擎
var render = views('./view', {
    map: { html: 'ejs' }
});

//引入service模块，他是前后端数据交互的纽带
var service = require('./service/webAppService.js');

//提供静态资源服务
var koa_static = require('koa-static-server');

//设置静态文件目录
app.use(koa_static({
    rootDir: './static',    //文件的位置
    rootPath: '/static',    //url的路径，注意/前无点
    maxage: 0   //不缓存
}));

app.use(controller.get('/route_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = 'Hello Koa!';
}));

//渲染书籍首页
app.use(controller.get('/', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', {
        title: '书城首页'
    });
}));

//渲染书籍搜索页
app.use(controller.get('/search', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {
        title: '书籍搜索'
    });
}));

//渲染书籍详情页
app.use(controller.get('/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book', {
        title: '书籍详情'
    });
}));

//渲染书籍阅读页
app.use(controller.get('/reader', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('reader', {
        title: '内容阅读'
    });
}));

//渲染书籍男生页
app.use(controller.get('/male', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', {
        title: '男生频道',
        concern: '最受关注',
        recommend: '主编推荐',
        news: '新书入库',
        over: '完结好书'
    });
}));

//渲染书籍女生页
app.use(controller.get('/female', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female', {
        title: '女生频道',
        concern: '最受关注',
        recommend: '主编推荐',
        news: '新书入库',
        over: '完结好书'
    });
}));

//渲染书籍分类页
app.use(controller.get('/category', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category', {
        title: '书籍分类',
        concern: '最受关注',
        recommend: '主编推荐',
        news: '新书入库',
        over: '完结好书'
    });
}));

//渲染书籍排行页
app.use(controller.get('/rank', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank', {
        title: '书籍排行'
    });
}));

//为ajax请求做的路由如下
//获得搜索信息
app.use(controller.get('/ajax/search', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));

//获得搜索推荐热门信息
// app.use(controller.get('/ajax/search_ad', function* () {
//     this.set('Cache-Control', 'no-cache');
//     this.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
//     this.set('Access-Control-Allow-Methods', 'GET, POST');
//     this.body = yield service.get_search_ad_data();
// }));

//获得首页信息
app.use(controller.get('/ajax/index', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

//获得排序信息
app.use(controller.get('/ajax/rank', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));

//获得种类信息
app.use(controller.get('/ajax/category', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

//获得女生信息
app.use(controller.get('/ajax/female', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));

//获得男生信息
app.use(controller.get('/ajax/male', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));

//获得book信息
app.use(controller.get('/ajax/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        //模拟数据
        id = '18218';
    }
    this.body = service.get_book_data(id);
}));

//获得章节id
app.use(controller.get('/ajax/chapter', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

//获得章节信息
app.use(controller.get('/ajax/chapter_data', function* () {
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        //模拟数据
        id = '1';
    }
    this.body = service.get_chapter_content_data(id);
}));

app.listen(3000);
console.log('Koa server is started!');