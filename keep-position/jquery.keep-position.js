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

/*
	$(function(){
		$(window).on('unload.keep-position',function(){
			if(!c.nowSubmit){
				$.removeCookie(c.key);
			}
		});
		var timer = [10];
		$(timer).each(function(i){
			setTimeout(function(){var pos = $.cookie(c.key);!pos || $(window).scrollTop($.cookie(c.key));}, timer[i]);
		});

	});
*/
})(jQuery);
