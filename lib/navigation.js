(function(w, jQuery){

	var States = [];
	var dataURL = [];

 	var navigation = {
		
		History:window.History,

		fromArrow:true,
		
		timestamps:[],
		dominio:"http://crossroads.rushmore.preproduccion.com",
		PATH:"",
		
		title_:"",
		
		init: function () {
			this.loadStates ();
			
			//Navegacion desde las flechas del navegador
			History.Adapter.bind(window,'statechange',function(e){ 
				var State = History.getState().url; 
				var barras = State.split("/");
				var sec = barras[barras.length-1];
				
				var exist = false;
				var sec_sub = "";
				
				var rtn1 = navigation.findSec(sec); 
				if (rtn1.exist) {
					exist = true;
					sec_sub = "SEC";
				} else {
					for (x=1;x<States.length;x++) {
						var rtn2 = navigation.findSub( String(States[x].nombre),sec); 
						if (rtn2.exist) {
							exist = true;
							sec_sub = "SUB";
							break;
						} 
					}
				} 
				
				//console.log ( String((exist)?'Si':'No') + " existe la carpeta " + sec + " y es " +  String((sec_sub=="SEC")?'seccion':'subseccion'));
				
				if (exist) {
					navigation.montaSection(sec,sec_sub);
				} else {
					navigation.fourCeroFour();	
				}
			});
			
			for (i=0;i<States.length;i++) {
				var f = new Function('name', 'window.navigation_.routes("'+ States[i].url +'","'+ States[i].title +'")');

				console.log ();

				crossroads.addRoute(this.dominio + this.PATH + States[i].url, f);	
			}
			
			$.each(dataUrl, function( key, val ) {
				if (val.subs.length > 0) {
					crossroads.addRoute(navigation.dominio + navigation.PATH + val.url + '/{id}', function (id) {
						navigation.routesSubs(val.nombre,id,val.title);
					});
				}
			});
			
			crossroads.bypassed.add(function(request){	w.navigation_.fourCeroFour ();	});
			this.parseRoads ();
		},
		
		loadStates: function () {
			dataUrl = w.secuenciador_.giveUrls ();
			
			for (i=0;i<dataUrl.length;i++) {
				var o_ = {
					'nombre': dataUrl[i].nombre,
					'data': {},
					'title': dataUrl[i].title,
					'url' : dataUrl[i].url,
				};
				States.push(o_);
			}
		},

		getStates: function () {
			return States;
		},

		fourCeroFour: function () {
			console.log ("Sacamos 404!!");
		},
		
		routes: function (param,title) {
			//console.log ("route: " + param);
			this.title_ = String(title);
			
			var io = param.indexOf("/");
			var str = String(param);
			var sec =str.substring(io+1,param.length);

			this.montaSection (sec,"SEC");
		},
		
		routesSubs:function (nombre,id,title) {
			//console.log ("seccion:" + nombre + ", subseccion___:" + id) ; 
			
			this.title_ = String(title);
			
			var obj = this.findSub (nombre, id);			

			if (!obj.exist) this.fourCeroFour ();
			else this.montaSection (obj.nombre, "SUB");
		},
		
		findSec: function (nombre) {
			for (i=0;i<dataUrl.length;i++) {
				var o_ = dataUrl[i];
				
				var indi = String(o_.url).indexOf("/");
				var n_ = String(o_.url).substring(indi+1,o_.url.length);
				if (String(nombre) == n_) {
					this.title_ = String(o_.title);
					
					return {exist: true, nombre:n_};
					break;
				}
			}

			return {exist: false};
		},
		
		findSub: function (nombre,id) {
			for (i=0;i<dataUrl.length;i++) {
				var o_ = dataUrl[i];
				if (o_.subs.length>0 && o_.nombre == nombre) {
					for (z=0;z<o_.subs.length;z++) {
						var indi = String(o_.subs[z].url).indexOf("/");
						var n_ = String(o_.subs[z].url).substring(indi+1,o_.subs[z].url.length);
						if (String(id) == n_) {
							 this.title_ = String(o_.subs[z].title);
							
							 return {exist: true, nombre:n_};
							 break;
						}
					}
				}
			}
			
			return {exist: false};
		},
		
		montaSection: function (nomSec, secsub) {
			//console.log (nomSec + "_" + secsub);
			
			if (nomSec == "") nomSec = "portada";
			
			var section = (secsub =="SEC")?true:false;
			
			if (section) {
				if (nomSec == "") {
					//console.log ("hay que ir a la seccion Portada");	
					Eventos.getSingleton().dispatchEventListener(Eventos.SECSUBLOADED, this, "SEC", nomSec, this.fromArrow);
				} else {
					//console.log ("hay que ir a la seccion " + nomSec);
					Eventos.getSingleton().dispatchEventListener(Eventos.SECSUBLOADED, this, "SEC", nomSec, this.fromArrow);
				}
			} else {
				//console.log ("hay que ir a la subseccion " + nomSec);
				Eventos.getSingleton().dispatchEventListener(Eventos.SECSUBLOADED, this, "SUB", nomSec, this.fromArrow);
			}
			
			this.fromArrow = true;
			
			document.title = this.title_;
		},
		
		parseRoads:function () {
			var initialPath = hasher.getBaseURL();
			crossroads.parse(initialPath);
		},
	
		gotoSection:function (url) {
			this.fromArrow = false;
			
			var url;
			for (x=0;x<States.length;x++) {
				if (String(States[x].url).indexOf(url) > 0) url = States[x].url;
			}
			
			if (url == "portada") url = "/";
			
			var t = new Date().getTime();
			this.timestamps[t] = t;
			var urlPush = this.PATH + url;
			
			History.pushState({timestamp:t}, "WildGo", urlPush);	
		},
		
		gotoSub:function (sec, sub) {
			this.fromArrow = false;	
			
			var url = "/" + String(sec) + "/"+String (sub);
			
			var t = new Date().getTime();
			this.timestamps[t] = t;
			var urlPush = this.PATH + url;
			
			History.pushState({timestamp:t}, "WildGo", urlPush);
		}
	}
		
    w.navigation_ = navigation; 
	
})(window, jQuery);










































