var socket4 = io.connect('http://localhost:8080');

socket4.on('estado-historico-persiana', function (data) {
	renderPersiana(data);
});

function renderPersiana(data) {
	console.log(data);
	var html = data.map(function (data, index) {
		return(`<div">
				<strong>${data.fecha}</strong>
				<em>${data.estado}</em>
				<br/>
			</div>`); 
	}).join(" ");

	document.getElementById('estadoPersiana').innerHTML = html;
}