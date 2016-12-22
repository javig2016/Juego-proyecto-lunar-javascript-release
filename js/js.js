var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g.toFixed(2);
var dt1 = 0.016683;
var dt = dt1.toFixed(2);
var timer=null;
var timerFuel=null;
var fuel=100;


//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c0")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
		document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c0")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  }
 	  else{
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 82% de la pantalla
	if (y<82){ 
		document.getElementById("nave").style.top = y+"%"; 
	} 
	else { 
		stop();
		document.getElementById("imgnave").src="img/explosion.png";
	}
}
function motorOn(){
	if (timerFuel==null && fuel>0)
	a=-g;
	timerFuel=setInterval(function(){ actualizarFuel(); }, 100);
	document.getElementById("imgnave").src="img/naveonfire.png";
}                           
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("imgnave").src="img/nave.png";
}

function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if (fuel > 0){
	fuel-=1;
	document.getElementById("fuel").innerHTML=fuel;
	}
}

