// search页数据
new Vue({
    el: '#app',
    data: {
        adlist: [],
        search: [],
        condition: true,
        empty: false
    },
    methods: {
        init: function () {
            // var vm = this;
            // $.get('http://dushu.xiaomi.com/store/v0/ad?', {
            //     key: 'df_search_tags',
            //     a: '1'
            // }, function(d) {
            //     vm.adlist = d.ads;
            // }, 'json')
            // $.ajax({
            //     crossOrigin: true,
            //     url: 'http://dushu.xiaomi.com/store/v0/ad?key=df_search_tags&a=1',
            //     success: function (result) {
            //         vm.adlist = result.ads;
            //     }
            // });
            // $.ajax({
            //     headers: {
            //         'Access-Control-Allow-Origin': '*'
            //     },
            //     url: 'http://dushu.xiaomi.com/store/v0/ad?key=df_search_tags&a=1',
            //     dataType: "json",
            //     success: function (result) {
            //         var aaa = result;
            //         console.log(aaa)
            //     }
            // });
        },
        doSearch: function (e) {
            var keyword = $('#search_box').val();
            var vm = this;
            $.get('/ajax/search', {
                keyword: keyword
            }, function (d) {
                vm.condition = false;
                vm.search = d.items;
                console.log(vm.search.length);
                if (vm.search.length == 0) {
                    vm.empty = true;
                } else {
                    vm.empty = false;
                }
            }, 'json')
        }
    },
    created() {
        this.init();
    }
});