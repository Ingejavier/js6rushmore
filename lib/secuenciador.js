(function(w, jQuery){
	
	ficheros = {
	  "files": 
	  [
		  {
			"source": "/img/lupa.png",
			"type": "IMAGE",
			"size": 1700
		  },
		  {
			"source": "/img/sanjordi.jpg",
			"type": "IMAGE",
			"size": 38000
		  },
		  {
			"source": "/img/uyuyuy.png",
			"type": "IMAGE",
			"size": 185000
		  },
		  {
			"source": "/img/worldmap1.png",
			"type": "IMAGE",
			"size": 56000
		  },
		  {
			"source": "/img/worldmap2.png",
			"type": "IMAGE",
			"size": 17000
		  }
  	  ]
	};
	
 	var secuenciador = {
		loading: null,
		idsubs: [],
		data:null,
		
		FUNC:null,
		
		onLoadedFunct:null,
		binds: [],
		
		init: function () {
			this.loading = new Loading ();
			
			this.eventsecuenciador ();
			this.getJSON ();
		},
		
		setListener: function (f, scope) {
			this.FUNC = f;
			
			Eventos.getSingleton().addEventListener (Eventos.SECSUBLOADED, this.FUNC, scope);
		},
		
		getJSON: function () {
			$.getJSON( "/json/rutas.json", function( data ) {
			  Eventos.getSingleton().dispatchEventListener(Eventos.JSONLOADED, this, data);
			});
		},
		
		jsonLoaded: function (e, data) {
			this.data = data;
			$.each( data, function( key, val ) {
				var obj = {nombre: val.nombre, title:val.title, url: val.url, subs:[]};
				if (val.subs.length > 0) {
					var arr= [];
					for (x=0;x<val.subs.length;x++) {
						arr.push (val.subs[x]);
					}
					obj.subs = arr;
					
				}
				secuenciador.idsubs.push (obj);
			});
			secuenciador.assetsLoader();
		},
		
		giveUrls: function () { return this.idsubs },

		/*
			Loading de los assets
		*/
		assetsLoader: function () {
			jQuery.html5Loader({
				filesToLoad:ficheros,
				stopExecution:true,
				onBeforeLoad: function () {
					secuenciador.configLoading (ficheros.files.length);
				},				
				onUpdate: function(perc){
					secuenciador.updateLoading (perc);
				},				
				onElementLoaded: function ( obj, elm ){
					Eventos.getSingleton().dispatchEventListener(Eventos.ASSETLOADED, this, obj, elm);
				},
				onComplete: function () {
					secuenciador.loading.onEndLoaded ();
				}
			});
		},
		
		configLoading: function (len) {
			this.loading.configLoading (len);
		},

		updateLoading: function (perc) {
			this.loading.onUpdateLoading (perc);
		},
		
		assetLoaded: function (e, obj, elm) {
			this.loading.onAssetLoaded ();
		},
		
		assetsLoaded: function (e) {
			//console.log ("loading de assets terminado, iniciamos el controlador de navegacion");
			this.parseSecSub ();
			w.navigation_.init ();
		},
		
		parseSecSub: function () {
			for (i=0;i<this.idsubs.length;i++) {
				//console.log(this.idsubs[i].nombre)
				var secO = {sec:this.idsubs[i].nombre, subs:false}
				if (this.idsubs[i].subs.length > 0) {
					var arr_tmp = [];
					for (z=0;z<this.idsubs[i].subs.length;z++) {
						var t_tmp = this.idsubs[i].subs[z].url;
						var nomsub = t_tmp.substring(1,t_tmp.length);
						arr_tmp.push({sec:this.idsubs[i].nombre, sub:nomsub});
					}
					secO.subs = arr_tmp;
				}
				this.binds.push(secO);
			}

			if (this.onLoadedFunct) this.onLoadedFunct ();			
		},
		
		getBinds: function () {	return this.binds; },
		onLoaded: function (f) { this.onLoadedFunct = f; },
		
		/*
			Manejador eventos
		*/
		eventsecuenciador: function () {
			//on json lodaded
			Eventos.getSingleton().addEventListener (Eventos.JSONLOADED, this.jsonLoaded, this);
			//on each asset loaded.
			Eventos.getSingleton().addEventListener (Eventos.ASSETLOADED, this.assetLoaded, this);
			//on all assets loaded.
			Eventos.getSingleton().addEventListener (Eventos.ASSETSLOADED, this.assetsLoaded, this);
		}
	}
		
    w.secuenciador_ = secuenciador; 
	
})(window, jQuery);