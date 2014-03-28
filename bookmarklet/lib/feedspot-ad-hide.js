(function(){
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
		$('div.f_subnav_i2').hide()
	});
})();
