DragBar = function (drag_, type_) {
	this.dragbar = drag_;
	
	this.bg = drag_.children("#bg_dragbar");
	this.drag = drag_.children("#draga");
	
	this.type = type_;
	
	this.ancho = 0;
	this.alto = 0;
	
	this.x = 0;
	this.y = 0;
	
	this.cantidad = 0;
	
	this.rule = new Regla (0,0,0);
	
	this.tamano = 10;
	
	this.callback;	
}

DragBar.prototype.set = function (x_, y_, an_, al_, c_, F_) {
	this.x = x_;
	this.y = y_;
	
	this.ancho = an_;
	this.alto = al_;
	
	this.cantidad = c_;
	
	this.callback = F_;
	
	this.dragbar.css("left", x_);
	this.dragbar.css("top", y_);	
	
	if (this.type == "horizontal") {
		this.bg.css("width", an_ + this.tamano);
		this.bg.css("height", al_);
	
		this.drag.css("width", this.tamano);
		this.drag.css("height", al_);
		this.rule.newData (0,this.ancho,this.cantidad);
	}
	if (this.type == "vertical") {
		this.bg.css("width", an_);
		this.bg.css("height", al_+ this.tamano);
	
		this.drag.css("width", an_);
		this.drag.css("height", this.tamano);
		this.rule.newData (0,this.alto,this.cantidad);		
	}
	
	var scope = this; 
	this.drag.draggable({ 
	 	containment: this.bg,
		
		drag: function(e) {
			scope.read (parseInt(e.target.style.left), parseInt(e.target.style.top) );
     	}
	});
}

DragBar.prototype.read = function (x_, y_) {
	var c;
	if (this.type == "horizontal") {
		c = this.rule.get_hallar (x_);
	}
	if (this.type == "vertical") {
		c = this.rule.get_hallar (y_);
	}	

	this.callback (c);
}
	
	
	
	
	
	
	
	
	
	
	
	
	