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
