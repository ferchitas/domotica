var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;

app.use(express.static('publico'));

var temperaturas =[{
	id:1,
	fecha: new Date(),
	estado: 21	
}];

var luminosidades =[{
	id:1,
	fecha: new Date(),
	estado: 14
}];

var estadosPersiana =[{
	id: 1,
	fecha: new Date(),
	estado: true
}];

var estadosAc =[{
	id: 1,
	fecha: new Date(),
	estado: "true"
}];
var sensores = [{

	fecha: new Date(),
	temperatura: 15,
	luminosidad: 15
}];

var mongoClient = new MongoClient(new MongoServer('127.0.0.1', 27017));
mongoClient.connect("mongodb://127.0.0.1:27017/domotica", function(err, db) {
	http.listen(8080, function () {
		console.log("servidor en 127.0.0.1:8080");
	});
	db.createCollection("test", function(err, collection){
		io.on('connection', function(socket){

			io.sockets.emit('cambiar-estado-persiana', estadosPersiana[estadosPersiana.length - 1]);
			io.sockets.emit('cambiar-estado-ac', estadosAc[estadosAc.length - 1]);
			io.sockets.emit('ultima-temperatura', temperaturas[temperaturas.length - 1]);
			io.sockets.emit('ultima-luminosidad', luminosidades[luminosidades.length - 1]);
			io.sockets.emit('ultimos-datos', {

				luminosidad: luminosidades[luminosidades.length - 1].estado,
				temperatura: temperaturas[temperaturas.length - 1].estado
			});
			//sensor de luminosidad
			socket.on('luminosidad-sensor-actual', function (data) {
				// aqui guardamos los datos en la bdd, de momento utilizamos el array
				luminosidades.push(data);
				socket.emit('luminosidad-historico-sensor', luminosidades);
				io.sockets.emit('ultima-luminosidad', luminosidades[luminosidades.length - 1]);
				io.sockets.emit('ultimos-datos', {

					luminosidad: luminosidades[luminosidades.length - 1].estado,
					temperatura: temperaturas[temperaturas.length - 1].estado
				});
			});
			//sensor de temperatura
			socket.on('temperatura-sensor-actual', function (data) {
				// aqui guardamos los datos en la bdd, de momento utilizamos el array
				
				temperaturas.push(data);
				io.sockets.emit('ultima-temperatura', temperaturas[temperaturas.length - 1]);
				socket.emit('temperatura-historico-sensor', temperaturas);
				io.sockets.emit('ultimos-datos', {

					luminosidad: luminosidades[luminosidades.length - 1].estado,
					temperatura: temperaturas[temperaturas.length - 1].estado
				});
			});
			//control de la persiana
			socket.on('usuarios-estado-persiana', function (data) {
				//mostramos como esta la persiana
				estadosPersiana.push(data);
				io.sockets.emit('estado-historico-persiana', estadosPersiana);
				io.sockets.emit('cambiar-estado-persiana', data);
			});
			socket.on('usuarios-estado-ac', function (data) {
				//mostramos como esta la aire acondicinado
				estadosPersiana.push(data);
				io.sockets.emit('estado-historico-ac', estadosPersiana);
				io.sockets.emit('cambiar-estado-ac', data);
			});
			socket.on('alerta-luminosidad', function (data) {
				io.sockets.emit('alerta-luminosidad', data);
			});
			socket.on('alerta-temperatura', function (data) {
				io.sockets.emit('alerta-temperatura', data);
				console.log(data);
				if(data.persiana == '2') {
					var estadoPersiana = {
						estado: false
					};
					console.log(estadoPersiana);
					io.sockets.emit('cambiar-estado-persiana', estadoPersiana);
					data.estado = parseInt(data.temperatura) - 2;
					temperaturas.push(data);
					io.sockets.emit('ultima-temperatura-alerta', temperaturas[temperaturas.length - 1]);
					//socket.emit('temperatura-historico-sensor', temperaturas);

				}
				else if(data.persiana == '3'){

					var estadoPersiana = {
						estado: true
					};
					io.sockets.emit('cambiar-estado-persiana', estadoPersiana);
					data.estado = parseInt(data.temperatura) + 2;
					console.log(estadoPersiana);
					temperaturas.push(data);
					io.sockets.emit('ultima-temperatura-alerta', temperaturas[temperaturas.length - 1]);
					socket.emit('temperatura-historico-sensor', temperaturas);
					
				}
			});
			socket.on('alerta-ultimos-datos', function (data) {
				io.sockets.emit('alerta-ultimos-datos', data);
				io.sockets.emit('cambiar-estado-persiana', data);
			});

			socket.emit('my-address', {host:socket.request.connection.remoteAddress, port:socket.request.connection.remotePort});
			socket.on('poner', function (data) {
				collection.insert(data, {safe:true}, function(err, result) {});
			});
			socket.on('obtener', function (data) {
				collection.find(data).toArray(function(err, results){
					socket.emit('obtener', results);
				});
			});

		});
	});
});

console.log("Servicio MongoDB iniciado");