var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('publico'));

var temperaturas =[{
	id:1,
	fecha: new Date(),
	temperatura: 1
}];

var luminosidades =[{
	id:1,
	fecha: new Date(),
	luminosidad: 1
}];

io.on('connection', function(socket){

	console.log("alguien se ha conectado");
	//sensor de temperatura
	socket.on('temperatura-sensor-actual', function (data) {
		// aqui guardamos los datos en la bdd, de momento utilizamos el array
		temperaturas.push(data);
		console.log(temperaturas);
	});
	//sensor de luminosidad
	socket.on('luminosidad-sensor-actual', function (data) {
		// aqui guardamos los datos en la bdd, de momento utilizamos el array
		luminosidades.push(data);
		console.log(luminosidades);
		console.log("esto se ejecuta");
	});

});

http.listen(8080, function () {
	console.log("servidor en 127.0.0.1:8080");
});