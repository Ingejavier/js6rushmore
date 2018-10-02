(function(w, jQuery){

 	var book = {

 		active: true,
 		secciones:[],
 		queu:[],

 		cierra:null,
 		abrir:null,
 		onsec:false,

		init: function () {
			w.secuenciador_.init ();
			w.secuenciador_.onLoaded (this.writeBinds);
			w.secuenciador_.setListener (this.goto, this);

			Eventos.getSingleton().addEventListener(Eventos.ACTIVATOR, this.activador, this );
			Eventos.getSingleton().addEventListener(Eventos.DESMONTADO, this.desmontado, this);

		},

		writeBinds: function (b) {
			var secsubs = w.secuenciador_.getBinds ();
			$.each(secsubs, function( key, val ) {
				$("#sec" + (key)).bind("click",  function () { w.navigation_.gotoSection (secsubs[key].sec); });
				book.secciones.push ({ nom:val.sec, obj:eval("w." + val.sec + "_")});

				if (val.subs) {
					$.each(val.subs, function( key, val ) {
						$("#sub" + String(key+1)).bind("click",  function () { w.navigation_.gotoSub (val.sec, val.sub);  });
						book.secciones.push ({ nom:val.sub, obj:eval("w." + val.sub + "_")});
					});
				}
			});
		},

		activador: function () {
			this.active = true;
			this.onsec = true;

			var n_ = this.lookQueu();

			if (n_) {
				this.active = false;				
				this.abrir = n_;
				this.desmonta ();
			} 
		},

		desmontado: function () {
			this.onsec = false;

			if (this.abrir) {
				
				var n_ = this.lookQueu();

				if (n_) this.abrir = n_;

				for (o=0; o<this.secciones.length; o++) {
					var ob = this.secciones[o];

					if (ob.nom == this.abrir) {
						ob.obj.monta ();
						this.cierra = this.abrir;
						break;
					}
				}
			} else {
				this.active = true;
			}
		},

		desmonta: function () {
			for (o=0; o<this.secciones.length; o++) {
				var ob = this.secciones[o];

				if (ob.nom == this.cierra) {
					ob.obj.desmonta ();

					break;
				}
			}
		},

		goto: function (e, secsub, nombre, fromArrow) {
			this.queu.push(nombre);

			if (!this.active) return;
			this.active = false;
			for (o=0; o<this.secciones.length; o++) {
				var ob = this.secciones[o];

				if (ob.nom == nombre) {
					if (!this.onsec) {
						ob.obj.monta ();
						this.cierra = nombre;
						
					} else {
						this.abrir = nombre;
						this.desmonta ();
					}
					this.queu = new Array ();
					break;
				}
			}
		},

		lookQueu: function () {
			if (this.queu.length <= 0) return;
			var next = this.queu[this.queu.length-1];
			this.queu = new Array () ; 
			
			return next;
		}
	}
		
    w.book_ = book; 
	
})(window, jQuery);










































