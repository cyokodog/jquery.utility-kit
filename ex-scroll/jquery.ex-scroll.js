/*
 * 	Ex Scroll 0.2 - jQuery plugin
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
		c.range = c.prevRange = {};
		c.scrollStatus = c.prevScrollStatus = plugin.status.SCROLL_END;
		c.scrollPosition = o.getPosition();
		var timer;
		c.target.scroll(function(event){
			o.event = event;
			if(o.setStatus()){
				c.scrollStatus = (
					o.isScrollEnd() ? plugin.status.SCROLL_START :
						o.isScrollStart() ? plugin.status.SCROLL_NOW : c.scrollStatus
				);
				c.onScroll.apply(o, [o]);
			}
			if(timer) clearTimeout(timer);
			timer = setTimeout(function(){
				o.setStatus();
				c.scrollStatus = plugin.status.SCROLL_END;
				c.onScroll.apply(o, [o]);
			},c.delay);
		});
	}

	// API
	$.extend(plugin.prototype, {
		getPosition : function(){
			var o = this, c = o.config;
			return {
				top : c.target.scrollTop(),
				left : c.target.scrollLeft()
			};
		},
		setStatus : function(){
			var o = this, c = o.config;
			var position = o.getPosition();
			position.x = position.left;
			position.y = position.top;
			var y = position.top - c.scrollPosition.top;
			var x = position.left - c.scrollPosition.left;
			if(y != 0 || x != 0){
				c.prevRange = c.range;
				c.range = {x:x ,y:y};
				c.prevScrollStatus = c.scrollStatus;
				c.scrollPosition = position;
				return true;
			}
			return false;
		},
		getScrollStatus : function(){
			var o = this, c = o.config;
			return c.scrollStatus;
		},
		getScrollPosition : function(){
			var o = this, c = o.config;
			return c.scrollPosition;
		},
		getRangeX : function(){
			var o = this, c = o.config;
			return c.range.x;
		},
		getRangeY : function(){
			var o = this, c = o.config;
			return c.range.y;
		},
		isScrollX : function(){
			var o = this, c = o.config;
			return o.getRangeX() != 0;
		},
		isScrollY : function(){
			var o = this, c = o.config;
			return o.getRangeY() != 0;
		},
		isScrollStart : function(){
			var o = this, c = o.config;
			return c.scrollStatus == plugin.status.SCROLL_START;
		},
		isScrollNow : function(){
			var o = this, c = o.config;
			return c.scrollStatus == plugin.status.SCROLL_NOW;
		},
		isScrollEnd : function(){
			var o = this, c = o.config;
			return c.scrollStatus == plugin.status.SCROLL_END;
		}
	});

	// Setting
	$.extend(plugin,{
		status : {
			SCROLL_START : 'start',
			SCROLL_NOW : 'now',
			SCROLL_END : 'end',
		},
		defaults : {
			delay : 100,
			onScroll : function(api){}
		},
		version : '0.2',
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

