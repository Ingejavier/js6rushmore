(function(w, jQuery){

 	var summer = {

		init: function () {
			TweenMax.set(jQuery("#luzsummer"),{ transformOrigin:"0px 0px"  })
			TweenMax.set(jQuery("#luzsummer"),{ rotation: -55 })

			this.moveRay ();
		},

		moveRay: function () {
			TweenMax.to(jQuery("#luzsummer"), 25, { scale:1.3, rotation: 45 })

		},

		stop: function () {     TweenMax.killTweensOf(jQuery("#luzsummer")); }

	}

	 w.summer_ = summer;
	
})(window, jQuery);
