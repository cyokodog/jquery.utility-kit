var util = {
	load : function(url, callback){
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;
		script.onload = function(){
			callback();
		};
		document.body.appendChild( script );
	}
}
// jQuery のロード
util.load('http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function(){

	// 表示用モーダルウィンドウの生成
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

	//マークダウンリストの出力
	$('a').each(function(){
		var t = $(this);
		modal.val(modal.val() + '- [' + $.trim(t.text()) + '](' + t.prop('href') + ')\n');
	});
});
