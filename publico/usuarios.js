var socket2 = io.connect('http://localhost:8080', {'forceNew': true});


function cambiar(event) {

	var payload = {
		estado: document.getElementById('persianaCheckBox').checked,
		fecha: new Date()
	};
	socket2.emit('usuarios-estado-persiana', payload);
	console.log("f1");
	return false;
}