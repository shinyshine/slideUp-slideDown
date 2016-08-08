(function() {
	var myScroll,
        upIcon = $(".pull-up-icon"),
        downIcon = $(".pull-down-icon"),
        distance = 30; //滑动距离
    // 滚动配置
    function iscrollConfig() {
        myScroll = new IScroll('#wrapper', {
            probeType: 3,
            mouseWheel: true,
            click: true, //默认是所有的click事件都返回false(click,a标签都没反应),加这个就好了
            //tap: true,
            //preventDefaultException: { tagName: /^(UL)$/ }
            // disableMouse: true,
            // disablePointer: true,
        });

        // 自定义下拉和上拉
        myScroll.on("scroll", function() {
            var y = this.y,
                maxY = this.maxScrollY - y,
                downHasClass = downIcon.hasClass("reverse-down"),
                upHasClass = upIcon.hasClass("reverse-up");
            if (y >= distance) {
                !downHasClass && downIcon.addClass("reverse-down");
                $('.pull-down-msg').html('松开刷新');
                return "";
            } else if (y < distance && y > 0) {
                downHasClass && downIcon.removeClass("reverse-down");
                $('.pull-down-msg').html('下拉刷新');
                return "";
            }

            if (maxY >= distance) {
                !upHasClass && upIcon.addClass("reverse-up");
                $('.pull-up-msg').html('松开加载更多');
                return "";
            } else if (maxY < distance && maxY >= 0) {
                upHasClass && upIcon.removeClass("reverse-up");
                $('.pull-up-msg').html('上拉加载更多');
                return "";
            }
        });

        // 下拉刷新事件
        myScroll.on("slideDown", function() {
            if (this.y > distance) {
                upIcon.removeClass("reverse-down");
                window.location.reload();
            }
        });
        // 上拉加载更多
        myScroll.on("slideUp", function() {
            if (this.maxScrollY - this.y > distance) {
            	console.log('loadMore');
                loadMore();
                upIcon.removeClass("reverse-up");
            }
        });
    }

    //初始化和上拉加载更多都是调用这个函数
    function loadMore() {
        var html = '';
		for(var i = 0; i < 8; i ++) {
			html += '<li>下拉下拉下拉下拉' + i + '</li>'
		}

		$('#wrapper ul').append(html);
    }

    iscrollConfig();
})();