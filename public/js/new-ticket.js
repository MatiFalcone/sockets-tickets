// Comando para establecer la conexión
var socket = io();

// Referencia a la label HTML que quiero cambiar (JQuery)
var label = $('#lblNuevoTicket');

socket.on('connect', () => {

	console.log('Conectado con el servidor.');

})

socket.on('disconnect', () => {
	
	console.log('Desconectado del servidor.');
	
})

socket.on('estadoActual', (estadoActual) => {

	if (estadoActual.actual === 'Ticket 0') {
		label.text('No hay tickets pendientes');
	} else {
		label.text(estadoActual.actual);		
	}

})

//JQuery para que todos los botones disparen este evento cuando se hace click
$('button').on('click', function() {

	socket.emit('siguienteTicket', null, function(siguienteTicket) {
		label.text(siguienteTicket);
	});

})