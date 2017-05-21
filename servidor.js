var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('publico'));

var temperaturas =[{
	id:1,
	fecha: new Date(),
	temperatura: 21	
}];

var luminosidades =[{
	id:1,
	fecha: new Date(),
	luminosidad: 14
}];

var estadosPersiana =[{
	id: 1,
	fecha: new Date(),
	estado: true
}];

io.on('connection', function(socket){

	console.log("alguien se ha conectado" + socket.id);
	
	//sensor de luminosidad
	socket.on('luminosidad-sensor-actual', function (data) {
		// aqui guardamos los datos en la bdd, de momento utilizamos el array
		luminosidades.push(data);
		socket.emit('luminosidad-historico-sensor', luminosidades);
	});
	//sensor de temperatura
	socket.on('temperatura-sensor-actual', function (data) {
		// aqui guardamos los datos en la bdd, de momento utilizamos el array
		temperaturas.push(data);
		socket.emit('temperatura-historico-sensor', temperaturas);
	});
	//control de la persiana
	socket.on('usuarios-estado-persiana', function (data) {
		//mostramos como esta la persiana
		estadosPersiana.push(data);
		io.sockets.emit('estado-historico-persiana', estadosPersiana);
	});
});

http.listen(8080, function () {
	console.log("servidor en 127.0.0.1:8080");
});