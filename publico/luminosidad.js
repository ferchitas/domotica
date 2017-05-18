var socket = io.connect('http://localhost:8080', {'forceNew': true});

function mandarLuminosidad(event) {
	var payload = {
		luminosidad: document.getElementById('luminosidad').value,
		fecha: new Date()
	};
	socket.emit('luminosidad-sensor-actual', payload);
	return false;
}