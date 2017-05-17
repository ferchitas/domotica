var socket = io.connect('http://localhost:8080', {'forceNew': true});


socket.on('messages', function (data) {
	console.log(data);
	render(data);
});

function render(data) {
	var html = data.map(function (data, index) {
		return(`<div">
				<strong>${data.author}</strong>
				<em>${data.text}</em>
				<br/>
			</div>`); 
	}).join(" ");

	document.getElementById('message').innerHTML = html;
}

function addMessage(event) {
	var payload = {

		author: document.getElementById('username').value,
		text: document.getElementById('text').value

	};
	socket.emit('new-message', payload);
	return false;
}