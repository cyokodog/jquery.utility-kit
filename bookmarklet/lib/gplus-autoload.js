(function(){
	if(!(/\/plus.google.com\//.test(location.href))) return;
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
	util.load('http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function(){
		setInterval(function(){
			var btn = $('div.tke');
			if(/新着/.test(btn.text())){
				btn.find('> *')[0].click();
				setTimeout(function(){
					var top = $('div.Ypa > *').eq(1).offset().top;
					$('html,body').animate({scrollTop:top-40});
				},1000);
			}
		},3000);
	});
})();
