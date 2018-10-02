(function(w, jQuery){
	
 	var portada = {
		name: "portada",
		iniciado: false,
		
		init: function () {
			
		},
		
		monta: function (e) {
			if (!this.iniciado) {
				this.init ();
			}
			
			TweenMax.to (jQuery("#portada"), .8, { opacity: 1, ease:Quad.easeOut, onComplete: function () { portada.montado(); }});
		},
		
		montado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.ACTIVATOR, null, true);
		},
		
		desmonta: function () {
			TweenMax.to (jQuery("#portada"), .8, { opacity: 0, ease:Quad.easeOut, onComplete: function () { portada.desmontado(); }});
		},
		
		desmontado: function () {
			Eventos.getSingleton().dispatchEventListener(Eventos.DESMONTADO);
		},
		
		resize: function () {
		
		}
	}
		
    w.portada_ = portada; 
	
})(window, jQuery);