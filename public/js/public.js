var socket = io();

// Variables JQuery
var ticket1 = $('#lblTicket1');
var escritorio1 = $('#lblEscritorio1');
var ticket2 = $('#lblTicket2');
var escritorio2 = $('#lblEscritorio2');
var ticket3 = $('#lblTicket3');
var escritorio3 = $('#lblEscritorio3');
var ticket4 = $('#lblTicket4');
var escritorio4 = $('#lblEscritorio4');

var labelTickets = [ticket1, ticket2, ticket3, ticket4];
var labelEscritorios = [escritorio1, escritorio2, escritorio3, escritorio4];

socket.on('connect', () => {

	console.log('Conectado con el servidor.');

})

socket.on('disconnect', () => {
	
	console.log('Desconectado del servidor.');
	
})

socket.on('estadoActual', (estadoActual) => {

	actualizaHTML(estadoActual.ultimosCuatro);

})

socket.on('ultimosCuatro', (ultimosCuatro) => {

	var audio = new Audio('audio/new-ticket.mp3');
	audio.play();

	actualizaHTML(ultimosCuatro.ultimosCuatro);

})

function actualizaHTML(ultimosCuatro) {

	for (var i = 0; i < ultimosCuatro.length; i++) {
		labelTickets[i].text('Ticket ' + ultimosCuatro[i].numero);
		labelEscritorios[i].text('Escritorio ' + ultimosCuatro[i].escritorio);
	}

}
