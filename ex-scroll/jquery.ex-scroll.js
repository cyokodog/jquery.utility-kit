/*
 * 	Ex Scroll 0.2.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2013 cyokodog 
 *		http://www.cyokodog.net/
 *		http://cyokodog.tumblr.com/
 *		http://d.hatena.ne.jp/cyokodog/)
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

;(function($){

	// Constructor
	var plugin = $.exScroll = function(target, option){
		if(typeof option == 'function') option = {onScroll : option};
		var o = this,c = o.config = $.extend(true,{}, plugin.defaults, option);
		c.target = target;
		c.position = {};
		c.ragne = {};
		o._setStatus();
		c.timing = 'end';
		var timer;
		c.target.scroll(function(event){
			o.event = event;
			o._setStatus();
			c.timing = c.timing == 'end' ? 'start' : 'now';
			c.onScroll.apply(o, [o]);
			if(timer) clearTimeout(timer);
			timer = setTimeout(function(){
				o._setStatus();
				c.timing = 'end';
				c.onScroll.apply(o, [o]);
			},c.delay);
		});
	}

	// API
	$.extend(plugin.prototype, {
		_setStatus : function(){
			var o = this, c = o.config;
			var top = c.target.scrollTop();
			var left = c.target.scrollLeft();
			var pos = {top:top, left:left, y:top, x:left};
			var y = pos.top - (c.position.top || 0);
			var x = pos.left - (c.position.left || 0);
			if(x != 0 || y != 0){
				c.position = pos;
				c.range = {top:y, left:x, y:y, x:x};
			}
		},

		// スクロール状況を "start", "now", "end" の何れかで返す。
		getTiming : function(){
			return this.config.timing;
		},

		// スクロール向きを "x", "y" の何れかで返す。
		getDirection : function(){
			var range = this.config.range;
			return range.x != 0 ? 'x' : (range.y != 0 ? 'y' : '');
		},

		// スクロール位置をオブジェクト（{top:integer, left:integer, x:integer, y:integer}）で返す。
		getPosition : function(){
			return this.config.position;
		},

		// 前回位置からのスクロール量をオブジェクト（{top:integer, left:integer, x:integer, y:integer}）で返す。
		getRange : function(){
			return this.config.range;
		},

		// 水平方向のスクロールの有無を真偽値（true or false）で返す。
		isScrollX : function(){
			return this.config.range.x != 0;
		},

		// 垂直方向のスクロールの有無を真偽値（true or false）で返す。
		isScrollY : function(){
			return this.config.range.y != 0;
		}
	});

	// Setting
	$.extend(plugin,{
		defaults : {
			delay : 100,
			onScroll : function(api){}
		},
		version : '0.2.1',
		id : 'ex-scroll',
		paramId : 'ex-scroll-param'
	});

	// jQuery Method
	$.fn.exScroll = function(option){
		return this.each(function(){
			var target = $(this);
			var api = target.data(plugin.id) || new plugin(target, option);
			target.data(plugin.id, api);
		});
	}

})(jQuery);
