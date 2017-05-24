var socket1 = io.connect('http://localhost:8080', {'forceNew': true});

socket1.on('luminosidad-historico-sensor', function (data) {
	renderLuminosidad(data);
});

function renderLuminosidad(data) {
	var html = data.map(function (data, index) {
		return(`<div">
				<strong>${data.fecha}</strong>
				<em>${data.estado}</em>
				<br/>
			</div>`); 
	}).join(" ");

	document.getElementById('historicoLuminosidad').innerHTML = html
}

function mandarLuminosidad(event) {
	var payload = {
		estado: document.getElementById('luminosidad').value,
		fecha: new Date()
	};
	socket1.emit('luminosidad-sensor-actual', payload);
	console.log("f5");
	return false;
}