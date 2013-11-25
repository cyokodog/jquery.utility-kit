/*
 * 	Keyinfo 0.1 - jQuery plugin
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
	$.each(k, function(i){
		var name = 'is' + i;
		k[name] = function(code){
			return arguments.callee.code == code;
		}
		k[name].code = k[i];
	});
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
