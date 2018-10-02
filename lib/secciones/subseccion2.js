(function(w, jQuery){
	
 	var subseccion2 = {
		name: "subseccion2",
		iniciado: false,
		
		init: function () {
			
		},
		
		monta: function (e) {
			if (!this.iniciado) {
				this.init ();
			}
			
			TweenMax.to (jQuery("#subseccion2"), .8, { opacity: 1, ease:Quad.easeOut, onComplete: function () { subseccion2.montado(); }});
		},
		
		montado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.ACTIVATOR, null, true);
		},
		
		desmonta: function () {
			TweenMax.to (jQuery("#subseccion2"), .8, { opacity: 0, ease:Quad.easeOut, onComplete: function () { subseccion2.desmontado(); }});
		},
		
		desmontado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.DESMONTADO);
		},
		
		resize: function () {
		
		}
	}
	
		
    w.subseccion2_ = subseccion2; 
	
})(window, jQuery);