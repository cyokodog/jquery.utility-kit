;(function($){
	$.modal = function(target, option){
		var c = $.extend({}, $.modal.defaults, option)
		target.css(c);
		target.on('click', function(){return false});
		$('html').on('click', function(){target.remove()});
	}
	$.modal.defaults = {
		'position':'fixed',
		'z-index':'99999',
		'top':0,
		'left':0,
		'margin-left':'4%',
		'padding':'1%',
		'width':'90%',
		'height':'400px',
		'background':'#f0f0f0',
		'border':'solid 1px #e0e0e0'
	}
	$.fn.modal = function(option){
		return this.each(function(){
			new $.modal($(this), option);
		});
	}
/*
	$.modal = function(){
		var modal = $('<textarea/>').css({
			'position':'fixed',
			'z-index':'99999',
			'top':0,
			'left':0,
			'margin-left':'4%',
			'padding':'1%',
			'width':'90%',
			'height':'400px',
			'background':'#f0f0f0',
			'border':'solid 1px #e0e0e0'
		}).prependTo('body').on('click', function(){return false});
		$('html').on('click', function(){modal.remove()});
		return modal;
	}
*/
})(jQuery);

