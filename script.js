
window.onload = function()
{
	inicio();
}

function inicio()
{
	canvas = nom_div("canvas");
	var ctx = canvas.getContext("2d");
	var w = 450;
	var h = 450;
	var dc = 15; //La dimensión que tendrá la culebrita...
	var direccion = 0; //Por defecto inciará hacia la derecha...
	var posMueve = [[-1, 0], [0, -1], [1, 0], [0, 1]];
	var culebrita;
	var cilcloJuego = "";
	var pause = false;
	var score = 17;
	var nivel_basico=200;
		var colores = {
		fondo : "black",
		culebrita : "green", 
		comida : "blue"
	}
	var comida = "";
	var nivel_1=5;
		var nivel_2=5;
		var nivel_3=5;
		var nivel_4=5;


	

function ola (n) {
	if(cilcloJuego != "")
		{
			clearInterval(cilcloJuego);
		}
		cilcloJuego = setInterval(function(){
			if(!pause)
			{
				dibujarCulebrita();
			}

		},n );

}

//**Funcion Comida Culebrita
var comidaCulebrita = function()
	{
		//Generar puntos aletorios entre 0 - 44
		comida = {
					x: Math.round(Math.random()*(w - dc) / dc), 
					y: Math.round(Math.random()*(h-dc)/dc)
				 };
	}//Fin de la Función




//Funcion Crea Culebrita
		function creaCulebrita()
	{
		var largoCulebrita = 5; 
		culebrita = []; //Vaciar el array...
		for(var i = largoCulebrita - 1; i >= 0; i--)
		{
			culebrita.push({x: i, y:0});
		}
	}//Fin de la funcion crea culebrita.


	function iniciaJuego()
	{
		
		pause = false;
		score = 0;
		direccion = 2;
		comidaCulebrita();
		nom_div("puntua").innerHTML = "Score: " + score;
		creaCulebrita();
		ola(nivel_basico);
		
	}

	iniciaJuego();


function variablesiniciales () {

		nivel_1=5;
		nivel_2=5;
		nivel_3=5;
		nivel_4=5;
		nom_div("notificacion").innerHTML = "Estas en el nivel básico siguiente nivel en: "+nivel_1;
			
}




//Canvas y propiedades (Colores FOndo y Linea)
	var dibujaCanvas = function()
	{
		ctx.fillStyle = colores.fondo;
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "red";
		ctx.strokeRect(0, 0, w, h);	
	}//Fin del edicion de canvas
	


//Funcion COlision
	var colisionCulebrita = function(x, y, cuerpo)
	{
		//Detectar si la posición x, y está en el cuerpo de la culebrita...
		var hayColision = false;
		for(var i in cuerpo)
		{
			if(cuerpo[i].x === x && cuerpo[i].y === y)
			{
				hayColision = true;
				break;
			}
		}
		
		return hayColision;
		
	}//Fin de la colision
	





//////////////DIBUJAR CULEBRITA/////////////////////////////////
	function dibujarCulebrita()
	{
		dibujaCanvas();
		var cabezaX = culebrita[0].x;
		var cabezaY = culebrita[0].y;
	
		cabezaX += posMueve[direccion][0];
		cabezaY += posMueve[direccion][1];
		//Saber si la culebrita se choca contra el escenario...
		var colisionaCuerpo = colisionCulebrita(cabezaX, cabezaY, culebrita);
		if(cabezaX == -1 || cabezaX == w/dc || cabezaY == -1 || cabezaY == h/dc || colisionaCuerpo)
		{
			audios("muere.mp3");
			variablesiniciales();
			iniciaJuego();
		    return;
		}


	
		if(cabezaX == comida.x && cabezaY == comida.y)
		{
			//Se crea una nueva cabeza en vez de mover la cola...
			audios("moneda.mp3");
			score++;

			if(score>=0&&score<=5){
				nivel_1=nivel_1-1;
				nom_div("notificacion").innerHTML = "Estas en el nivel básico siguiente nivel en: "+nivel_1;
			};

			if(nivel_1==0){
			nom_div("notificacion").innerHTML = "!!NICE!!";
			};
		

			if (score>=6&&score<=10) {
				nivel_2=nivel_2-1;
				nom_div("notificacion").innerHTML = "Estas en el nivel medio siguiente nivel en:"+nivel_2;
				var nivel_medio=125;
				ola(nivel_medio);
				};

			if(nivel_2==0){
			nom_div("notificacion").innerHTML = "!!EXCELLENT!!";
			};		


			if (score>=11&&score<=15) {
				nivel_3=nivel_3-1;
				nom_div("notificacion").innerHTML = "Estas en el nivel alto siguiente nivel en:"+nivel_3;
			 	var nivel_alto=75;
				ola(nivel_alto);
			};	

		if(nivel_3==0){
			nom_div("notificacion").innerHTML = "!!FANTASTIC!!";
			};	

		
			if (score>=16&&score<=20) {
				nivel_4=nivel_4-1;
				nom_div("notificacion").innerHTML = "Estas en el nivel !!EXTREMO!! siguiente nivel en: "+nivel_4;
			 	var nivel_extremo=35;
				ola(nivel_extremo);
			};	

		if(nivel_4==0){
			nom_div("notificacion").innerHTML = "¿Estas listo para lo que viene?";
			};	

			if (score>=21) {
				var nivel_extremo2=15;
				ola(nivel_extremo2);
			};	

			nom_div("puntua").innerHTML = "Score: " + score;
			var cola = {x: cabezaX, y : cabezaY};
			comidaCulebrita();
		}
		else
		{
			//Elimina el último objeto del array culebrita y lo guarda el cola...
			var cola = culebrita.pop();
			cola.x = cabezaX;
			cola.y = cabezaY;
		}
		//Pone la inicio...
		culebrita.unshift(cola);

		for(var i = 0; i < culebrita.length; i++)
		{
			var c = culebrita[i];
			dibujarCelda(c.x, c.y, colores.culebrita);
		}
		//Dibujar la comida en el escenario...
		dibujarCelda(comida.x, comida.y, colores.comida);
	}



//CONTORNO DE LA CELDA
	function dibujarCelda(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x * dc, y * dc, dc, dc);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * dc, y * dc, dc, dc);
	}////

	
	

	//Para controlar a la culebrita con el teclado...
	var presionado = false;

	window.onkeydown = function(e)//Validar si la tecla esta oprimida
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(!presionado)
		{
			if(code >= 37 && code <= 40)
			{
				var reversa = false;
				switch(code)
				{
					case 37: if(direccion == 2) reversa = true;
							 break;
					case 38: if(direccion == 3) reversa = true;
							 break;
					case 39: if(direccion == 0) reversa = true;
							 break;
					case 40: if(direccion == 1) reversa = true;
							 break;
				}
				if(!reversa)
				{
					direccion = code - 37;
					console.log(direccion);
				}
			}
			presionado = true;
		}
	}//FIN___Validar si la tecla esta oprimida


	window.onkeyup = function(e)//Validar si la tecla esta levantada
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(presionado)
		{
			presionado = false;
		}
	}//FIN___ VALIDAR SI LA TECLA ESTA LEVANTADA


///Metodos change para cambiar color de (FONDO; CULEBRITA Y COMIDA)
	for(var i = 1; i <= 3; i++)
	{
		nom_div("opcion_" + i).addEventListener('change', function(event)
		{
			var ind = event.target.id.split("_");
			switch(Number(ind[1]))
			{
				case 1: colores.fondo = this.value; break;
				case 2: colores.culebrita = this.value; break;
				case 3: colores.comida = this.value; break;
			}
		});
	}//FIN DE VALIDACION color de (FONDO; CULEBRITA Y COMIDA)



//Boton Pausa
	nom_div("detiene").addEventListener('click', function(event)
	{
		pause = !pause;
		if(pause)
		{
			this.value = "Continuar";
		}
		else
		{
			this.value = "Pause";
		}
	});//Fin del Boton Pausa


//Boton descargar
	nom_div("descarga").addEventListener('click', function(event)
    {
        var nomfoto = prompt("Nombre de la Imagen", "Culebrita");
        this.download = nomfoto + ".png";
        this.href = canvas.toDataURL();
    }); // Fin del boton descargar




	//fin de controlar con el teclado...
	function audios(audio)
	{
		var txt = "<audio autoplay>";
		txt += "<source src = '"+(audio)+"' type = 'audio/mpeg'></audio>";
		nom_div("sonido").innerHTML = txt;
	}

	function nom_div(div)
	{
		return document.getElementById(div);
	}
}