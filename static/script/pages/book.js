// book页数据
var id;
if (location.href.indexOf('id=') > -1) {
    id = location.href.split('id=').pop()
}
else {
    //模拟数据
    id = '18218';
}

var screenWidth = $(window).width();
$.get('/ajax/book?id=' + id, function (d) {
    d.screenWidth = screenWidth;
    new Vue({
        el: '#app',
        data: d,
        methods: {
            getData: function () {
                location.href = '/reader';
            }
        }
    })
}, 'json');