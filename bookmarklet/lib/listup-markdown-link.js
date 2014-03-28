var Util = function(){
	if(!(this instanceof Util)) return new Util();
}
Util.prototype = {
	lastPath : function(){
		var o = this, s = document.getElementsByTagName('script'), len = s.length;
		var path;
		s[len-1].src.replace(/^(http:\/\/.+)\/(.+\..*\?*.*)/,function(a,b){
			path = b + '/';
		})
		return path;
	},
	load : function(url, callback){
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;
		script.onload = function(){
			callback();
		};
		document.body.appendChild( script );
	}
};
var util = Util();
var path = util.lastPath();
// jQuery のロード
util.load('http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function(){
util.load(path + 'modal.js?v', function(){

	var modal = $('<textarea/>').appendTo('body').modal();
	modal.val('- [' + $('title').text() + '](' + location.href + ')\n');
	$('a').each(function(){
		var t = $(this);
		modal.val(modal.val() + '- [' + $.trim(t.text()) + '](' + t.prop('href') + ')\n');
	});

});
});
