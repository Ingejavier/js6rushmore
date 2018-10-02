(function(w, jQuery){
	
 	var seccion1 = {
		name: "seccion1",
		iniciado: false,
		
		init: function () {
			
		},
		
		monta: function (e) {
			if (!this.iniciado) {
				this.init ();
			}
			
			TweenMax.to (jQuery("#seccion1"), .8, { opacity: 1, ease:Quad.easeOut, onComplete: function () { seccion1.montado(); }});
		},
		
		montado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.ACTIVATOR, null, true);
		},
		
		desmonta: function () {
			TweenMax.to (jQuery("#seccion1"), .8, { opacity: 0, ease:Quad.easeOut, onComplete: function () { seccion1.desmontado(); }});
		},
		
		desmontado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.DESMONTADO);
		},
		
		resize: function () {
		
		}
	}
	
		
    w.seccion1_ = seccion1; 
	
})(window, jQuery);