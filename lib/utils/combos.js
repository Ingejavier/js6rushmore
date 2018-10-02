
/*Funcion para seleccionar el precio segun el tamaño*/

/*precio#id de la promocion#texto descriptivo#precio descuento#imagen listado oferta#imagen listado oferta para móvil*/

/*	Gestiona el combo de promos: 
 *	Por defecto aparecen sin texto ni precio y si no tiene promocion la oferta tiene una clase "nopromo" que esta display: none por css y si
 *	si la tiene no tendrá la clase "nopromo"
 *
 *	Con el selector de tamanos: 
 *
 *	- Si selecciona un tamano que tiene promocion, ponemos precio_recomendado + precio descuento + texto descriptivo asociado a la promocion y 
 		mostramos la clase oferta con la imagen de la promocion segun su tamaño. 
 *	- Si selecciona un tamano que no tiene promocion, solo ponemos precio_recomendado y ocultamos la clase oferta.
 *
 */


var sel_tamanno = '.producto';
var sel_value = '';
var img_ofer_cargada = '';


$( document ).ready(function() {
   
	// console.log( "ready!" );
	$(this).find('.precio').hide();
	$(sel_tamanno).on('change', obtenerTxtTam);

});


function obtenerTxtTam() 
{
	// console.log("On change select");

   	// console.log("variable interior: "+ window.interior_);

 //    $("#producto #cont_izq").css('height','100%');
	// $("#producto #cont_der").css('height', '100%');

     // window.interior_.altoProducto();
	

 //    this.altoProducto();	

	sel_value = $(this).find('.tamano, .tamano_sel').find('select').val();

	// console.log("sel_value: "+sel_value);

	var arr = sel_value.split('#');
	
	// console.log(arr[1]+"/"+arr[2]);

	var precio_recomen = arr[0];
	var id_promo = arr[1];
	var txt_descrip = arr[2];
	var precio_desc = arr[3];
	var img_list_ofer = arr[4];
	var img_list_ofer_mob = arr[5];


	if(isMobile.any)
	{	
		img_ofer_cargada = img_list_ofer_mob;
	}

	else
	{	
		img_ofer_cargada = img_list_ofer;
	}

	// console.log("img_list_ofer: /"+img_list_ofer+"/");
	// console.log("sel_value: "+sel_value);

	if(sel_value != "")
	{	

		$(this).find('.precio').show();

		if ( img_list_ofer != "" )
		{
			$(this).find('.precio').html('<p><span class="negrita">' + precio_recomen + '€ P.V.P.</span> recomendado  &sol;  <span class="negrita">' + precio_desc + '€</span> precio del mes. ' + txt_descrip + ' </p>');
			$(this).find('.oferta').show();	

			if ( $(this).find(".oferta").length > 0 )
			{
				// console.log("existe la oferta");		
				$(this).find('.oferta').show();	
				$(this).find('.oferta').find('img').attr("src",img_ofer_cargada);
			}
			else
			{
				// console.log("no existe la oferta");
				$(this).find('.precio').html('<p><span class="negrita">' + precio_recomen + '€ P.V.P.</span> recomendado</p>');		
			}

		}

		else
		{
			$(this).find('.oferta').hide();
			$(this).find('.precio').html('<p><span class="negrita">' + precio_recomen + '€ P.V.P.</span> recomendado</p>');
		}
	}

	else
	{
		// console.log("precio por defecto: ");
		$(this).find('.precio').hide();

		if($(this).find('.oferta').hasClass('nopromo'))
			$(this).find('.oferta').hide();
		else
			$(this).find('.oferta').show();
	}

}
