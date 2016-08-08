(function() {

	var Util = {
		slideDownReload: {
			content: null,
			pullDown: null,
			pullDownIcon: null,
			pullDownMsg: '',
			pullUp: null,
			pullUpIcon: null,
			pullUpMsg: '',
			distance: 40,
			scale: 0.3,
			init: function(content, pullDown, pullDownIcon, pullDownMsg, pullUp, pullUpIcon, pullUpMsg, dis, scale) {
				var _this = this;
				_this.content = content;
				_this.pullDown = pullDown;
				_this.pullDownIcon = pullDownIcon;
				_this.pullDownMsg = pullDownMsg;
				_this.pullUp = pullUp;
				_this.pullUpIcon = pullUpIcon;
				_this.pullUpMsg = pullUpMsg;

				if (dis) {
					_this.distance = dis;
				}
				if (scale) {
					_this.scale = scale;
				}

				_this.addListener();
			},
			addListener: function() {
				var _this = this;
				var start = 0,
					end = 0;

				var winHeight = window.innerHeight;
				_this.content.addEventListener("touchstart", function(event) {

					_this.pullDown.className = '';
					var touch = event.targetTouches[0];
					start = touch.pageY;
				}, false);
				_this.content.addEventListener("touchmove", function(event) {
					
					var touch = event.targetTouches[0];
					end = touch.pageY - start;
					var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;

					if (end > 0 && scrolltop == 0) {
						event.preventDefault();
						//向下滑-刷新的情况
						_this.pullDown.className = '';
						_this.pullDown.style.marginTop = -(_this.distance - end * _this.scale) + 'px';

						if (end > _this.distance / _this.scale) {
							_this.pullDownIcon.className = 'pull-down-icon reverse-down';
							_this.pullDownMsg.innerText = '松开刷新';

						} else {
							_this.pullDownIcon.className = 'pull-down-icon';
							_this.pullDownMsg.innerText = '下拉刷新';
						}
					}else if(end < 0 && (winHeight + scrolltop == document.body.clientHeight)){
						
						// 向上滑-加载更多的情况
						// 判断是否触底，然后加载更多
						// 屏幕高度 window.innerHeight  
						// 滚动高度  scrollTop
						// 文档整体高度 document.body.clientHeight
						event.preventDefault();

						_this.pullUp.className = '';
						_this.pullUp.style.marginBottom = -(_this.distance + end * _this.scale) + 'px';

						if((-end) > _this.distance / _this.scale) {
							_this.pullUpIcon.className = 'pull-up-icon reverse-up';
							_this.pullUpMsg.innerText = '松开加载更多';
						} else {
							_this.pullUpIcon.className = 'pull-up-icon';
							_this.pullUpMsg.innerText = '下拉加载更多';
						}

						return true;
					}

				}, false);
				_this.content.addEventListener("touchend", function(event) {

					if (end > 0) {
						_this.pullDown.className = 'transition';

						if (end > _this.distance / _this.scale) {
							window.location.reload();
						} else {
							_this.pullDown.style.marginTop = '-' + _this.distance + 'px';
						}

					} else if(end < 0 && (winHeight + document.body.scrollTop + (-end * _this.scale) >= document.body.clientHeight)) {
						_this.pullUp.className = 'transition';
						if((-end) > _this.distance / _this.scale) {
							_this.loadMore();
							_this.pullUp.style.marginBottom = '-' + _this.distance + 'px';
						} else {
							_this.pullUp.style.marginBottom = '-' + _this.distance + 'px';
						}
					}
				}, false);
			},
			// 上拉加载更多
			loadMore: function() {
				var html = '';
				for(var i = 0; i < 8; i ++) {
					html += '<li>下拉下拉下拉下拉' + i + '</li>'
				}

				$('#wrapper ul').append(html);
			},
		}
	}

	var content = document.getElementById('wrapper'),
		pullDown = document.getElementById('pullDown'),
		pullDownIcon = document.getElementsByClassName('pull-down-icon')[0],
		pullDownMsg = document.getElementsByClassName('pull-down-msg')[0],
		pullUp = document.getElementById('pullUp'),
		pullUpIcon = document.getElementsByClassName('pull-up-icon')[0],
		pullUpMsg = document.getElementsByClassName('pull-up-msg')[0];

	Util.slideDownReload.init(content, pullDown, pullDownIcon, pullDownMsg, pullUp, pullUpIcon, pullUpMsg);

})();