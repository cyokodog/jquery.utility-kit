/*
 * 	Hash Contents 0.4 - jQuery plugin
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

	// Constructor
	var plugin = $.hashContents = function(targets, option){
		var o = this, op = option || {}, df = plugin.defaults,
		c = o.config = $.extend(true,{}, df, df.defaultBaseStyle[op.baseStyle||'']||{}, op);
		c.removeOtherContents = c.removeOtherContents && c.toggleContents && c.reloadHashChange;
		c.useCookie = c.useCookie && !!$.cookie;
		c.targets = targets;
		if(c.targets.parent().hasClass('bottom-list')) c.listTo = 'after';

		o._init();

		if(c.nestSelector){
			c.targets.each(function(index){
				$(this).find(c.nestSelector).hashContents(c.nestOption || option);
			});
		}
	}

	// API
	$.extend(plugin.prototype, {

		// config の取得
		getConfig : function(){
			return this.config;
		},

		// json 形式の独自データ属性 の取得
		getJsonData : function(target,name){
			var r;
			try{eval('r = ' + (target || this.config.target).attr('data-' + (name || plugin.paramId)));}catch(e){return undefined;}
			return r;
		},

		// パラメータの取得
		getParam : function(name){
			var o = this, c = o.config;
			var v = c[name];
			return typeof v != 'function' ? v : v.apply(o,[o]);
		},

		getTargets : function(){
			return this.config.targets;	
		},

		setActiveHash : function(){
			var o = this, c = o.config;
			var s = plugin.status;
			var ids = {}, hashs = [], cookies = [], useHash, useCookie;
			var activeCount = 0;
			$.each(s.APIs, function(index){
				var api = s.APIs[index];
				var c = api.config;
				useHash = useHash || c.useHash;
				useCookie = useCookie || c.useCookie;
				if(c.activeTarget){
					var parents = c.activeTarget.parents('.' + plugin.id);
					if(c.activeTarget.size() && (!parents.size() || parents.size() == parents.filter('.active').size()) ){
						var id = c.activeTarget.prop('id');
						if(!ids[id]){
							ids[id] = 1;
							!c.useHash || hashs.push(id);
							!c.useCookie || cookies.push(id);
							activeCount ++;
						}
					}
				}
			});
			if(activeCount > 1 && c.positioning && s.activeTarget){
				var scrollTo = 'scrollTo:' + s.activeTarget.prop('id');
				if(c.useHash && hashs.length > 1) hashs.push(scrollTo);
				if(c.useCookie) cookies.push(scrollTo);
			}
//			location.hash = '!'+hashs.join('#');
//			if(useHash) location.hash = '!'+hashs.join('#');
			if(useHash){
				var len = hashs.length;
				location.hash = !len ? '' : (len == 1 ? '!' : '#') + hashs.join('#')
			}
			if(useCookie) $.cookie(c.cookiePrefix + '-active-id', cookies.join('#'));

		},

		getHash : function(){
			return location.hash.replace(/^#!|^#/,'');
		},

		watch : function(callback, timer){
			var callee = arguments.callee;
			setTimeout(function(){
				var ret = callback();
				if(ret == undefined || !!ret) callee(callback, timer);
			},timer || 100);
		},

		getActiveTarget : function(){
			return this.config.activeTarget;
		},

		showContents : function(){
			var o = this, c = o.config;
			var s = plugin.status;
			if(!c.activeTarget)return;
			c.targets.removeClass('active');
			c.activeTarget.addClass('active');
			!c.activeTitleTo || $(c.activeTitleTo).text(c.activeTarget.data(plugin.id + '-title'));
			setTimeout(function(){
				if(c.removeOtherContents){
					c.targets.each(function(){
						var t = $(this);
						if(!t.hasClass('active')){
							t.html('');
						}
					});
				}
				try{c.onActive.apply(o,[o]);}catch(e){}
			},0)
			var toggleContents = function(callback){
				if(c.toggleContents || c.clickableContents){
					c.clickableContents || c.targets.hide();
					if(c.effect){
						var effectTarget = c.activeTarget;
						if(c.reloadHashChange){
							c.activeTarget.show();
							effectTarget = $('body').hide();
						}
						effectTarget[c.effectMethod](c.effectSpeed);
						o.watch(function(){
							if(!effectTarget.is(':hidden')){
								callback();
								return false;
							}
						});
					}
					else{
						c.activeTarget.show();
						callback();
					}
				}
				else{
					c.targets.show();
					callback();
				}
			}
			var positioning = function(){
				if(c.positioning && s.activeTarget && !s.scrollTimer){
					s.scrollTimer = setTimeout(function(){
						var top = s.activeTarget.offset().top;
						if(c.smoothScroll){
							$('html,body').animate({scrollTop:top}, c.scrollSpeed);
						}
						else{
							$('html,body').scrollTop(top);
						}
						s.scrollTimer = 0;
						s.activeTarget = '';
					},0);
				}
			}
			toggleContents(positioning);
		},
		
		reload : function(){
			$('body').hide();
			setTimeout(function(){location.reload();},0);
		},

		_init : function(){
			var o = this, c = o.config;
			var s = plugin.status;

			// set APIs
			s.APIs.push(o);

			// base setting
			c.targets.each(function(index) {
				var target = c.targets.eq(index);

				// set API
				target.data(plugin.id ,o);

				// set className
				target.addClass(plugin.id);

				// set id
				var id = target.prop('id');
				if(!id){
					id = c.idPrefix + (index + 1);
					s.autoIndex ++;
					if($('#' + id).size()){
						id = c.idPrefix + s.autoIndex;
						if($('#' + id).size()){
							id = c.idPrefix + s.autoIndex + '_' + (index + 1);
						}
					}
				}
				target.prop('id', id);

				var title = (o.getJsonData(target)||{}).title ||
					target.attr('data-title') ||
					target.find(c.titleSelector).eq(0).text() ||
					c.title ||
					id;

				// set title
				target.data(plugin.id + '-title', title);
			});

			// set active target
			(function(){
				var setActiveTarget = function(hashs){
					if(!hashs) return;
					var arr = hashs.split('#');
					$.each(arr, function(){
						var hashId = String(this);
						var scrollTo = hashId.match(/^scrollTo:(.+)/);
						if(scrollTo) scrollTo = scrollTo[1];
						!hashId || c.targets.each(function(index) {
							var target = c.targets.eq(index);
							var id = target.prop('id');
							if(id == hashId) c.activeTarget = target;
							if(id == scrollTo) s.activeTarget = target;
						});
					});
				}
//				c.activeTarget = c.targets.eq(0);
				!c.initShowContents || (c.activeTarget = c.targets.eq(0));

				var hashs = o.getHash();
				!c.useCookie || setActiveTarget($.cookie(c.cookiePrefix + '-active-id'));
//				!c.useHash || setActiveTarget(hashs);
				setActiveTarget(hashs);
				var arr = hashs.split('#');
				if(c.positioning && arr.length == 1 && arr[0]) s.activeTarget = s.activeTarget || c.activeTarget;
			})();

			// build list
			if(c.listTo){
				var listToAll, method = (({before:'first',after:'last'})[c.listTo]);
				if(!method) listToAll = $(c.listTo);
				else {
					listToAll = [];
					$(!c.splitList ? (c.targets[method]()) : c.targets).each(function(index){
						var t = $(this);
						var list = $(t.parent().prop('tagName') == 'UL' ? '<li/>' :
							( c.listToMarkup || c.splitList ? '<div/>' : '<ul/>' ) );
						t[c.listTo](list);
						listToAll.push(list[0]);
					});
					listToAll = $(listToAll);
				}
				!listToAll.size() || c.targets.each(function(index) {
					var target = c.targets.eq(index);
					var id = target.prop('id');
					var title = target.data(plugin.id + '-title')
					var size = listToAll.size();
					listTo = listToAll.eq(index < size ? index : size - 1);

					listTo.addClass(plugin.id + '-list').addClass(plugin.id + '-list-' + index)
					var li = $(listTo.prop('tagName') == 'UL' ? '<li/>' : '<div/>').addClass('list-row').addClass('list-row-' + index);
					if(c.activeTarget && c.activeTarget[0] == target[0]){
						li.addClass('active');
					}
					var a = $('<a/>').text(title).prop('href','#' + id);
					a.appendTo(li);
					listTo.append(li);

					a.on('click', function(){
						if(!c.clickableContents || target.is(':hidden')){
							if(c.toggleContents && !c.clickableContents && !target.is(':hidden')) return false;
							if(!c.clickableContents) listToAll.find('.active').removeClass('active');
							li.addClass('active');
							c.activeTarget = target;
							if(c.positioning) s.activeTarget = target;
							s.stopHashChange = true;
/*
							o.showContents();
							o.setActiveHash();
							if(c.reloadHashChange){
								o.reload();
							}
*/
							if(c.reloadHashChange){
								o.setActiveHash();
								o.reload();
							}
							else{
								o.showContents();
								o.setActiveHash();
							}
						}
						else{
							li.removeClass('active');
							if(c.effect){
								target[c.effectMethod == 'slideDown' ? 'slideUp' : 'fadeOut'](c.effectSpeed);
							}
							else{
								target.hide();
							}
						}
						return false;
					});
				});
			}

			// show contents
			if(c.toggleContents) c.targets.hide();
			o.showContents();

			if(c.useHash && !s.bindedHashChange){
				s.bindedHashChange = true;
				$(window).on('hashchange.' + plugin.id, function(){
					if(s.stopHashChange){
						s.stopHashChange = false;
						return false;
					}
					o.reload();
				});
			}
		}

	});


	// Setting
	$.extend(plugin,{
		defaults : {
defaultBaseStyle : {
	accordion : {
		splitList : true,
		effectMethod : 'slideDown',
		initShowContents : false
	},
	tree : {
		splitList : true,
		effectMethod : 'slideDown',
		initShowContents : false,
		clickableContents : true
	},
	toc : {
		toggleContents : false,
		positioning : true,
		initShowContents : false
	}
},
			api : false,
baseStyle : '',	//"accordion", "tree", "toc"
			idPrefix : 'contents',
			useHash : true,
			useCookie : false,
			cookiePrefix : 'hash-contents-' + location.pathname,
			toggleContents : true,
clickableContents : false,
initShowContents : true,
			reloadHashChange : false,
			positioning : false,
			smoothScroll : true,
			scrollSpeed : 500,
			removeOtherContents : true,
nestSelector : '',
			effect : true,
			effectMethod : 'fadeIn',
			effectSpeed : 500,
			titleSelector : 'h1,h2,h3,h4,h5',
			title : '',
			activeTitleTo : '',
			listToMarkup : '',
			listTo : 'before', // or 'after'
			splitList : false,
			onActive : function(api){}
		},
		status : {
			bindedHashChange : false,
			stopHashChange : false,
			activeTarget : '',
			scrollTimer : '',
			autoIndex : 0,
			APIs : []
		},
		version : '0.4',
		id : 'hash-contents',
		paramId : 'hash-contents-param'
	});


	// jQuery Method
	$.fn.hashContents = function(option){
		var s = plugin.status;
		var targets = this;
		var api;
		targets.each(function(){
			api = api || $(this).data(plugin.id);
		});
		api = api || new plugin(targets, option);
		return (option || {}).api ? api : targets;
		var api = new plugin(targets, option);
	}



})(jQuery);

