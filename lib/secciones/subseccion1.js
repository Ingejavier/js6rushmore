(function(w, jQuery){
	
 	var subseccion1 = {
		name: "subseccion1",
		iniciado: false,
		
		init: function () {
			
		},
		
		monta: function (e) {
			if (!this.iniciado) {
				this.init ();
			}
			
			TweenMax.to (jQuery("#subseccion1"), .8, { opacity: 1, ease:Quad.easeOut, onComplete: function () { subseccion1.montado(); }});
		},
		
		montado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.ACTIVATOR, null, true);
		},
		
		desmonta: function () {
			TweenMax.to (jQuery("#subseccion1"), .8, { opacity: 0, ease:Quad.easeOut, onComplete: function () { subseccion1.desmontado(); }});
		},
		
		desmontado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.DESMONTADO);
		},
		
		resize: function () {
		
		}
	}
	
		
    w.subseccion1_ = subseccion1; 
	
})(window, jQuery);