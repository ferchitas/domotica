var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('temperatura-historico-sensor', function (data) {
	renderTemperatura(data);
});

function mandarTemperatura(event) {
	var payload = {
		temperatura: document.getElementById('temperatura').value,
		fecha: new Date()
	};
	socket.emit('temperatura-sensor-actual', payload);
	return false;
}


function renderTemperatura(data) {
	var html = data.map(function (data, index) {
		return(`<div">
				<strong>${data.fecha}</strong>
				<em>${data.temperatura}</em>
				<br/>
			</div>`); 
	}).join(" ");

	document.getElementById('historicoTemperatura').innerHTML = html;
}