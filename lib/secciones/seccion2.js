(function(w, jQuery){
	
 	var seccion2 = {
		name: "seccion2",
		iniciado: false,
		
		init: function () {
			
		},
		
		monta: function (e) {
			if (!this.iniciado) {
				this.init ();
			}
			
			TweenMax.to (jQuery("#seccion2"), .8, { opacity: 1, ease:Quad.easeOut, onComplete: function () { seccion2.montado(); }});
		},
		
		montado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.ACTIVATOR, null, true);
		},
		
		desmonta: function () {
			TweenMax.to (jQuery("#seccion2"), .8, { opacity: 0, ease:Quad.easeOut, onComplete: function () { seccion2.desmontado(); }});
		},
		
		desmontado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.DESMONTADO);
		},
		
		resize: function () {
		
		}
	}
	
		
    w.seccion2_ = seccion2; 
	
})(window, jQuery);