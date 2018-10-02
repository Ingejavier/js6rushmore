function Regla (i,f,d) {
	this.ini = 0;
	this.fin = 0;
	this.div = 0;
	this.regla = 0;	
	
	this.newData(i,f,d)
}

Regla.prototype.get_hallar = function (b) { 
	var divi=Math.abs(b-this.ini);
	return divi / this.regla;
}

Regla.prototype.newData = function (i, f, d) {
    this.ini = i ;
	this.fin = f ;
	this.div = d ;
	this.regla = Math.abs(this.fin - this.ini) / this.div;
}
