/*
 * 	Here Doc 0.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog 
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
	$.hereDoc = function(f, r){
		var doc = f.toString().split('\n').slice(1, -1).join('\n');
		if(r){
			$.each(r, function(i){
				doc = doc.replace(new RegExp('{' + i + '}'), r[i]);
			});
		}
		return doc;
	}
})(jQuery);
