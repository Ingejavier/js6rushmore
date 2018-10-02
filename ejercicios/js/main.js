(function(w, jQuery){

 	var main = {
		timeline:null,

 		virCont: [],
 		quanAnim:10,
 		virperquan:3,

 		viruFrom:0,
 		viruTo:0,

 		viruSum:0,

 		idsumviru:null,
 		idvirus:null,

		init: function () {
			w.summer_.init();

			this.virutas ();

			this.idsumviru = setScopedInterval (this.addVirutas, 290, this);

			this.timeline = new TimelineMax();
			this.strTL ();
		},

		strTL: function () {
			this.timeline.addLabel( "copy", "+=1.5");
			this.timeline.to( jQuery("#copy1"), .7, {opacity:1, ease:Quad.easeOut }, "copy");
			this.timeline.to( jQuery("#copy2"), .7, { opacity:1, ease:Quad.easeOut }, "copy+=1.5");
 			
			this.timeline.addLabel( "naranja", "+=1.8");
 			this.timeline.to( jQuery("#naranja"), .7, {opacity:1, ease:Quad.easeOut }, "naranja");

 			this.timeline.addLabel( "end", "+=.2");
 			this.timeline.to( jQuery("#oferta"), .7, {opacity:1, ease:Quad.easeOut }, "end");
 			this.timeline.to( jQuery("#masinfo"), .7, {opacity:1, ease:Quad.easeOut }, "end+=.5");
 			
		},

		virutas: function () {
			var virutasNum = this.quanAnim*this.virperquan;

			for( vir=1;vir<virutasNum+1;vir++) {
				var flor = Math.ceil(vir/this.virperquan);

				var virLeft = parseInt(jQuery("#letras_" + flor).css("left"));
				var virTop = parseInt(jQuery("#letras_" + flor).css("top"));

				$('#virutas').append('<div class="viru" id="viru'+vir+'"><img src="img/viru1.png"></div>');
				$('#viru'+vir).css('left',virLeft);
				$('#viru'+vir).css('top',virTop);
				
				var obj = {viru: $('#viru'+vir), left:virLeft, top:virTop, vx: ((Math.random()*1000)/100)-4, vy:4, rotation:0 , g: 0.2+((Math.random()*300)/1000), active: true}

				this.virCont[vir-1] = obj;
			}

			this.idvirus = setScopedInterval (this.anim, 25, this);
		},

		addVirutas: function () {
			TweenLite.to(jQuery("#letras_" + (this.viruSum+1)), .6, { opacity:1, ease:Quad.easeOut });

			this.viruTo = this.viruSum * this.virperquan;

			if (this.viruTo > this.virCont.length) {
				this.viruTo = this.virCont.length;
				clearInterval (this.idsumviru);
			}

			this.viruSum++;
		},

		anim: function () {
			for (x=this.viruFrom;x<this.viruTo;x++) {
				var allactive = 0;
				if (this.virCont[x].active) {
					allactive = 1;
					this.virCont[x].vy -= this.virCont[x].g
					this.virCont[x].left+=this.virCont[x].vx;
					this.virCont[x].top-=this.virCont[x].vy;
					this.virCont[x].rotation +=this.virCont[x].vx

					this.virCont[x].viru.show();
					
					TweenLite.set(this.virCont[x].viru,{rotation:this.virCont[x].rotation })
					this.virCont[x].viru.css ("left", this.virCont[x].left);
					this.virCont[x].viru.css ("top", this.virCont[x].top);

					if (this.virCont[x].top > 300) {
						this.virCont[x].active = false;
						break;
					} 
				}
			}
			if (allactive < 1) clearInterval (this.idvirus);
		}

	}

	w.main_ = main;

	function setScopedInterval(func, millis, scope) {
		return setInterval(function () {
			func.apply(scope);
		}, millis);
	}
	
	function setScopedTimeout(func, millis, scope) {
		return setTimeout(function () {
			func.apply(scope);
		}, millis);
	}	 
	
})(window, jQuery);
