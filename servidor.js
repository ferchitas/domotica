var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('publico'));
app.use(express.static('temperatura'));

var messages =[{
	id:1,
	text: "hola soy un mensaje",
	author: "Fernando Lujan"
}];

io.on('connection', function(socket){

	console.log("alguien se ha conectado");

	socket.emit('messages', messages);

	socket.on('new-message', function(data){

		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

http.listen(8080, function () {
	console.log("servidor en 127.0.0.1:8080");
});