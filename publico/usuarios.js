var socket2 = io.connect('http://localhost:8080', {'forceNew': true});

socket2.on('cambiar-estado-persiana', function (data) {
		
		if(data.estado == "undefined") 1+1;
		else if (!data.estado) document.getElementById('persianaCheckBox').checked = false;
		else document.getElementById('persianaCheckBox').checked = true;
	});

socket2.on('cambiar-estado-ac', function (data) {
		if(data.estado) document.getElementById('acCheckBox').checked = true;
		else  document.getElementById('acCheckBox').checked = false;
	});

socket2.on('ultima-temperatura', function (data) {
	renderTemperatura(data);

});

socket2.on('ultima-temperatura-alerta', function (data) {
	renderTemperatura(data);

});

socket2.on('ultima-luminosidad', function (data) {
	renderLuminosidad(data);
});

socket2.on('alerta-luminosidad', function (data) {
	renderAlertaLuminosidad(data);
});

socket2.on('alerta-temperatura', function (data) {
	renderAlertaTemperatura(data);

});

socket2.on('alerta-ultimos-datos', function (data) {
	renderAlertaDatos(data);
});


function cambiarPersiana(event) {

	var payload = {
		estado: document.getElementById('persianaCheckBox').checked,
		fecha: new Date()
	};
	socket2.emit('usuarios-estado-persiana', payload);
	return false;
}

function cambiarAc(event) {

	var payload = {
		estado: document.getElementById('acCheckBox').checked,
		fecha: new Date()
	};
	socket2.emit('usuarios-estado-ac', payload);
	return false;
}

function renderTemperatura(data) {
		html = `<div">
				<strong>${data.fecha}</strong>
				<em>${data.estado}</em>
				<br/>
			</div>`;
	document.getElementById('temperatura').innerHTML = html;
}

function renderAlertaLuminosidad(data) {
		html =`<div">
				<strong>${data.fecha}</strong>
				<em>${data.estado}</em>
				<br/>
			</div>`;
	document.getElementById('alertaLuminosidad').innerHTML = html;
}

function renderLuminosidad(data) {
		html =`<div">
				<strong>${data.fecha}</strong>
				<em>${data.estado}</em>
				<br/>
			</div>`;
	document.getElementById('luminosidad').innerHTML = html;
}

function renderAlertaTemperatura(data) {
	html =`<div">
				<strong>${data.fecha}</strong>
				<em>${data.estado}</em>
				<br/>
			</div>`;
	document.getElementById('alertaTemperatura').innerHTML = html;
}

function renderAlertaDatos(data) {
	html =`<div">
				<strong>${data.fecha}</strong>
				<em>${data.mensaje}</em>
				<br/>
			</div>`;
	document.getElementById('alertaDatos').innerHTML = html;
}