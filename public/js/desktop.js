// Comando para establecer la conexión
var socket = io();

socket.on('connect', () => {

	console.log('Conectado con el servidor.');

})

socket.on('disconnect', () => {
	
	console.log('Desconectado del servidor.');
	
})

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
	window.location = 'index.html';
	throw new Error('El escritorio no ha sido informado.');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {

	socket.emit('atenderTicket', { escritorio: escritorio }, function(ticketAtender) {
		
		if (ticketAtender === 'No hay tickets pendientes') {
			$('small').text(ticketAtender);
			alert(ticketAtender);
			return;
		}

		$('small').text('Ticket ' + ticketAtender.numero);

	});

})