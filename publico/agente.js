var socket3 = io.connect('http://localhost:8080', {'forceNew': true});

socket3.on('ultima-temperatura', function (data) {
	if (data.estado > 30) {

		socket3.emit('alerta-temperatura', {
			persiana: 2,
			temperatura: data.estado,
			estado: "temperatura por encima del limite",
			fecha: new Date()
		});
	}
	else if (data.estado < 15){
		socket3.emit('alerta-temperatura', {
			persiana: 3,
			temperatura: data.estado,
			estado: "temperatura por debajo del limite, sube la persiana",
			fecha: new Date()
		});
	}
	else {
		socket3.emit('alerta-temperatura', {
			persiana: 0,
			estado: "temperatura correcta",
			fecha: new Date()
		});
	}
});

socket3.on('ultima-luminosidad', function (data) {
	if (data.estado > 40) socket3.emit('alerta-luminosidad', {
		estado: "luminosidad por encima del limite, baja la persiana",
		fecha: new Date()
	});
	else if (data.estado < 10)socket3.emit('alerta-luminosidad', {
		estado: "luminosidad por debajo del limite, sube la persiana",
		fecha: new Date()
	});
	else socket3.emit('alerta-luminosidad', {
		estado: "luminosidad correcta",
		fecha: new Date()
	});
});

socket3.on('ultimos-datos', function (data) {
	if (data.luminosidad > 20 && data.temperatura > 20)socket3.emit('alerta-ultimos-datos', {
		mensaje: "la temperatura y la luminosidad estan por encima de los limites, bajo la persiana",
		fecha: new Date(),
		estado: false
	});
	else socket3.emit('alerta-ultimos-datos', {
		mensaje: " ",
		fecha: " ",
		estado: "undefined"
	});
});