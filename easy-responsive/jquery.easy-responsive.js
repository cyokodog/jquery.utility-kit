/*
 * 	Easy Responsive 0.1 - jQuery plugin
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
	var plugin = $.easyResponsive = function(widths){
		if(!widths) widths = plugin.widths;
		var $win = $(window), $html = $('html');
		if($html.hasClass(plugin.id)) return;
		$html.addClass(plugin.id)
		var adjust = function(){
			$html.removeClass(plugin.prefix + widths.join(' '+plugin.prefix));
			$.each(widths.sort(), function(i){
				var width = widths[i];
				if($win.width() <= width) {
					$html.addClass('win'+width);
					return false;
				}
			});
		}
		adjust();
		var timer;
		$win.on('resize', function(){
			if(timer) clearTimeout(timer);
			timer = setTimeout(function(){
				adjust();
			},0);
		});
		return ret;
	};
	$.extend(plugin, {
		prefix : 'win',
		widths : [320,640,800,960,1280],
		id : 'easy-responsive'
	});
})(jQuery);
