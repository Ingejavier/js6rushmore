	var PATH_RAIZ="";
	
	var ieversion;

	var docW_ = 0;
	var docH_ = 0;

	function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return { width: srcWidth*ratio, height: srcHeight*ratio };
	}	
		
	function setScopedInterval(func, millis, scope) {
		return setInterval(function () {
			func.apply(scope);
		}, millis);
	}
	
	function setScopedTimeout(func, millis, scope) {
		return setTimeout(function () {
			func.apply(scope);
		}, millis);
	}

	function getDocWH () {
		docW_ = (ie8)?jQuery(window).innerWidth():window.innerWidth;
		docH_ = (ie8)?jQuery(window).innerHeight():window.innerHeight;
	}	
	
	function isIE( version, comparison ){
		var $div = $('<div style="display:none;"/>').appendTo($('body'));
		$div.html('<!--[if '+(comparison||'')+' IE '+(version||'')+']><a>&nbsp;</a><![endif]-->');
		var ieTest = $div.find('a').length;
		$div.remove();
		return ieTest;
	}
	
	/*
		if(isIE()){ runs in all versions of IE after 4 before standards-mode 10  }
		if(isIE(8)){  runs in IE8  }
		if(isIE(9)){ runs in IE9 }
		if(isIE(8,'lte')){  runs in IE8 or below  }
		if(isIE(6,'lte')){  if you need this, I pity you...  }	
	*/
	
	function IE1011() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');
	
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}
	
		if (trident > 0) {
			// IE 11 (or newer) => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}
	
		// other browser
		return false;
	}
	
	var ie8 = null;
	var ie9 = null;
	function IE789() {
		ie8 = isIE(8);
		ie9 = isIE(9);
	}
	IE789() ;
	
	var player;
	function onYouTubeIframeAPIReady() {
		console.log ("_");
		
		player = new YT.Player('video-placeholder', {
			width: 600,
			height: 400,
			videoId: 'Xa0Q0J5tOP0',
			playerVars: {
				color: 'white',
				playlist: 'taJ60kskkns,FG0fTKAqZ5g'
			},
			events: {
				onReady: initialize
			}
		});
	}
	
	function initialize(){
		// Update the controls on load
		updateTimerDisplay();
		updateProgressBar();
		// Clear any old interval.
		clearInterval(time_update_interval);
		// Start interval to update elapsed time display and
		// the elapsed part of the progress bar every second.
		time_update_interval = setInterval(function () {
			updateTimerDisplay();
			updateProgressBar();
		}, 1000)
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	