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
