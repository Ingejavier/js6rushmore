Loading = function () {
	this.loadiv = $("#loadiv");
	
	this.longitud = 0;
	
	this.pasos = 0;
	this.paso = 0;
	
	this.actual = 0;
	this.ultimo = 0;

	this.vel = .5;

	this.ended = false;

	this.configLoading = configLoadingFUN;
	this.onUpdateLoading = onUpdateLoadingFUN;
	this.onAssetLoaded = onAssetLoadedFUN;
	
	this.onEndLoaded = onEndLoadedFUN;
	this.animaLoaded = animaLoadedFUN;
	
	this.endLoading = endLoadingFUN;
}

function configLoadingFUN (len) {
	this.longitud = len;
	this.pasos = 100/this.longitud;
	
	this.animaLoaded ();
	this.hilo = setScopedInterval(this.animaLoaded, 25, this);
}

function animaLoadedFUN () {
	if (Math.abs(this.actual - this.end) > .5) {
		this.actual += (this.end-this.actual)/10;
		//console.log ("Animacion del loading ------>" + this.actual);
		this.loadiv.html ("Cargado el " + String(Math.ceil(this.actual)) + "%");
	} else {
		if (this.ended && (Math.abs(this.actual - 100) < .5)) {
			this.endLoading ();
		}
	}
}

function onUpdateLoadingFUN (per) {
	//console.log ("cargado el " + per);
}

function onAssetLoadedFUN () {
	this.paso++;
	//console.log (this.paso + " de " + this.longitud)
	this.end = this.pasos*this.paso;
}

function onEndLoadedFUN () {
	this.ended = true;
}

function endLoadingFUN () {
	//console.log ("terminado el loading");
	this.loadiv.html ("Cargado el 100%");
	TweenMax.to (this.loadiv, .5, { opacity: 0, ease:Quad.easeIn });
	
	Eventos.getSingleton().dispatchEventListener(Eventos.ASSETSLOADED, this);
	
	clearInterval (this.hilo);
}



