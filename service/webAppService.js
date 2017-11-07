//读取文件的时候不要忘记加上utf-8,不然获取不到数据
var fs = require('fs');
//把obj对象转化为http查询参数
var qs = require('querystring');
//用来发送请求
var http = require('http');

//获得搜索信息
exports.get_search_data = function (start, end, keyword) {
    //因为请求http接口是异步的，所有会导致get_search_data
    //是异步的，我们不能直接返回，直接返回会有问题
    return function (cb) {    //所以我们需要返回一个异步函数去做这件事件
        var data = {    //接受的参数
            s: keyword,
            start: start,
            end: end
        };
        var content = qs.stringify(data);   //转化为查询字符串
        var http_request = {    //指定要访问的地址
            hostname: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content
        };
        //上面组装好这些参数后，我们把请求发送出去
        var req_obj = http.request(http_request, function (_res) {    //(请求地址，回调(response响应对象))
            var content = '';   //返回的内容
            _res.setEncoding('utf8');   //设定返回的数据格式限定
            _res.on('data', function (chunk) {    //当接受到数据的时候触发data事件，返回的数据是一段一段的chunk
                content += chunk;
            });
            _res.on('end', function () {
                cb(null, content);  //把数据传出去 第一个参数为错误代码
            }); //数据接受完后触发end事件
        });
        req_obj.on('error', function () { });  //有可能响应出错
        req_obj.end();  //发送请求，这时将进入上面的回调
    }
};

//获得搜索热门推荐信息
// exports.get_search_ad_data = function () {
//     return function (cb) {
//         var http = require('http');
//         var data = {
//             key: 'df_search_tags',
//             a: '1'
//         };
//         var content = qs.stringify(data);
//         var http_request = {

//             hostname: 'dushu.xiaomi.com',
//             port: 80,
//             path: '/store/v0/ad?' + content
//         };
//         var req_obj = http.request(http_request, function (_res) {
//             var content = '';
//             _res.setEncoding('utf8');
//             _res.on('data', function (chunk) {
//                 content += chunk;
//             });
//             _res.on('end', function () {
//                 cb(null, content);
//             });
//         });
//         req_obj.on('error', function () { });
//         req_obj.end();
//     }
// };

//获得首页信息
exports.get_index_data = function () {
    var content = fs.readFileSync('./mock/home.json', 'utf-8');
    return content;
};

//获得排序信息
exports.get_rank_data = function () {
    var content = fs.readFileSync('./mock/rank.json', 'utf-8');
    return content;
};

//获得分类信息
exports.get_category_data = function () {
    var content = fs.readFileSync('./mock/category.json', 'utf-8');
    return content;
};

//获得female信息
exports.get_female_data = function () {
    var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
    return content;
};

//获得male信息
exports.get_male_data = function () {
    var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
    return content;
};

//获得book信息
exports.get_book_data = function (id) {
    var content = fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    return content;
};

//获取章节信息
exports.get_chapter_data = function () {
    var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
    return content;
};

//获得章节内容信息
exports.get_chapter_content_data = function (id) {
    var content = fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
    return content;
};