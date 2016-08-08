(function() {
	var translate = 0

	var Util = {
		slideDownReload: {
			content: null,
			scroller: null,
			pullDown: null,
			pullDownIcon: null,
			pullDownMsg: '',
			pullUp: null,
			pullUpIcon: null,
			pullUpMsg: '',
			distance: 40,
			scale: 0.7,
			init: function(content, scroller, pullDown, pullDownIcon, pullDownMsg, pullUp, pullUpIcon, pullUpMsg, dis, scale) {
				var _this = this;
				_this.content = content;
				_this.scroller = scroller;
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
					end = 0,
					moveDis = 0;
				var startTime = 0,
					endTime = 0;

				var preEnd = 0,
					time = 0,
					curMoveDis = 0;

				var winHeight = window.innerHeight,
					docHeight = _this.scroller.offsetHeight;;
				_this.content.addEventListener("touchstart", function(event) {
					event.preventDefault();
					//_this.scroller.style.transform = '';
					var transform = _this.scroller.style.transform;
					var translateY = transform.match(/translate\(\d+px,\s*(.*?)px/i)[1];
					console.log(translateY);
					//此时要让屏幕停止滑动, 但是我还没有做到
					preEnd = 0;
					startTime = new Date().getTime();
					_this.pullDown.className = '';
					var touch = event.targetTouches[0];
					start = touch.pageY;
				}, false);
				_this.content.addEventListener("touchmove", function(event) {
					event.preventDefault();

					var touch = event.targetTouches[0];
					end = touch.pageY - start;

					time = new Date().getTime() - startTime;
					
					curMoveDis = end - preEnd;
					preEnd = end;

					startTime = new Date().getTime();
					// console.log('time' + time);
					// console.log('curMoveDis' + curMoveDis);
					// console.log('curMoveDis/time' + (curMoveDis/time * 100000));

					_this.scroller.style.transitionDuration = '';
					_this.scroller.className = '';
					

					moveDis = translate + end;

					if(moveDis >= 0 || -moveDis > (docHeight - winHeight)) {
						end = end * _this.scale;
						moveDis = translate + end;

						if(moveDis >= 40) {
							_this.pullDownIcon.className = 'pull-down-icon reverse-down';
							_this.pullDownMsg.innerText = '松开刷新';
						} 
						else{
							_this.pullDownIcon.className = 'pull-down-icon';
							_this.pullDownMsg.innerText = '下拉刷新';
							if(-moveDis >= (docHeight - winHeight + 40)) {
								_this.pullUpIcon.className = 'pull-up-icon reverse-up';
								_this.pullUpMsg.innerText = '松开加载更多';
							}else {
								_this.pullUpIcon.className = 'pull-up-icon';
								_this.pullUpMsg.innerText = '下拉加载更多';
							}
						}
						
					}

					_this.scroller.style.transform = 'translate(0px, ' + moveDis + 'px) translateZ(0)';
				}, false);
				_this.content.addEventListener("touchend", function(event) {
					//此处代码有待完善
					_this.scroller.style.transitionDuration = '2500ms';

					event.preventDefault();
					console.log(curMoveDis/time * 1000);
					if( Math.abs(curMoveDis / time * 1000) < 100) {
						translate += end;
					}else {
						translate += end * 6;
					}
					if(translate > 0) {
						_this.scroller.className = 'transition';
						_this.scroller.style.transform = 'translate(0px,0px) translateZ(0)';
						translate = 0;
					}else if(-translate >= docHeight - winHeight) {
						_this.scroller.className = 'transition';
						_this.scroller.style.transform = 'translate(0px,' + (winHeight - docHeight) + 'px) translateZ(0)';
						translate = winHeight - docHeight;
					}else{
						_this.scroller.style.transform = 'translate(0px, ' + translate + 'px) translateZ(0)';
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
		scroller = document.getElementById('scroller'),
		pullDown = document.getElementById('pullDown'),
		pullDownIcon = document.getElementsByClassName('pull-down-icon')[0],
		pullDownMsg = document.getElementsByClassName('pull-down-msg')[0],
		pullUp = document.getElementById('pullUp'),
		pullUpIcon = document.getElementsByClassName('pull-up-icon')[0],
		pullUpMsg = document.getElementsByClassName('pull-up-msg')[0];

	Util.slideDownReload.init(content,scroller, pullDown, pullDownIcon, pullDownMsg, pullUp, pullUpIcon, pullUpMsg);

})();