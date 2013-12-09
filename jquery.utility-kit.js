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
/*
 * 	Parse URL 0.1 - jQuery plugin
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
	var plugin = $.parseURL = function(url){
		var prop = plugin.prop
		var loc = url ? $('<a/>').prop('href', url)[0] : location;
		var ret = {};
		$.each(prop, function(i){
			var n = prop[i];
			if(typeof loc[n] == 'string') ret[n] = loc[n];
		});
		var q = ret.query = {};
		if(ret.search){
			var s = ret.search.substr(1).split('&');
			$.each(s, function(i){
				var p = s[i].split('=');
				var v = p[1];
				try{
					v = decodeURIComponent(v);
				}catch(e){}
				q[p[0]] = v;
			});
		}
		return ret;
	}
	$.fn.parseURL = function(){
		var t = this.eq(0);
		return $.parseURL(t.prop('href') || t.prop('src'));
	}
	plugin.prop = ['hash','host','hostname','href','pathname','port','protocol','search'];

})(jQuery);
/*
 * 	Keyinfo 0.2 - jQuery plugin
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
	var k = $.keyinfo = {
		BS : 8,
		TAB : 9,
		ENTER : 13,
		SHIFT : 16,
		CTRL : 17,
		ALT : 18,
		ESC : 27,
		LEFT : 37,
		UP : 38,
		RIGHT : 39,
		DOWN : 40,
		DEL : 46
	}
	var f = {};
	$.each(k, function(i){
		var name = 'is' + i;
		f[name] = function(code){
			return arguments.callee.code == code;
		}
		f[name].code = k[i];
	});
	$.extend(true, k, f); // for IE8
	k.isCONTROL = function(code){
		var r = false;
		$.each(k, function(i){
			r = r || (k[i] == code);
		});
		return r;
	}
	k.isNUMBER = function(code){
		return (code >= 96 && code <= 105) || (code >= 48 && code <= 57);
	}
})(jQuery);
/*
 * 	Bookmarklet 0.1 - jQuery plugin
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
	$.fn.bookmarklet = function(){
		return this.each(function(){
			var a = $(this);
			var href = encodeURI("javascript:(function(){var s=document.createElement('script');s.type='text/javascript';s.src='"+a.prop('href')+"?'+(new Date()).getTime();document.body.appendChild(s);})();");
			a.prop('href', href);
		});
	}
})(jQuery);
/*
 * 	Keep Position 0.2 - jQuery plugin
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

	var plugin, c;
	plugin = $.keepPosition = {
		reload : function(){
			plugin._setInfo();
			location.reload();
		},
		_setInfo : function(){
			c.nowSubmit = true;
			$.cookie(c.key, $(window).scrollTop());
		}
	};
	c = plugin.config = {
		nowSubmit : false,
		key : 'keep-position-' + location.pathname
	}
	$.fn.keepPosition = function(){
		this.each(function(){
			var target = $(this);
			target.on(target.prop('tagName') == 'FORM' ? 'submit' : 'click',function(){
				plugin._setInfo();
			});
		});
	}

	$(function(){
		var win = $(window);
		win.on('unload.keep-position',function(){
			if(!c.nowSubmit){
				$.removeCookie(c.key);
			}
		});
		var pos = $.cookie(c.key);
		var timer = [0,10,100,200,300];
		$(timer).each(function(i){
			setTimeout(function(){win.scrollTop() == pos || win.scrollTop(pos||0);}, timer[i]);
		});
	});

})(jQuery);
