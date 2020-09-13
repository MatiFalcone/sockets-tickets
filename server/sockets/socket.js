const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

	// Emitir un evento estadoActual con el ultimoTicket
    client.emit('estadoActual', { actual: ticketControl.ultimoTicket(), ultimosCuatro: ticketControl.ultimos() });

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log('El siguiente ticket es el: ', siguiente);
        callback(siguiente);

    });

    client.on('atenderTicket', (data, callback) => {

    	if (!data.escritorio) {
    		return callback({
    			error: true,
    			mensaje: 'El escritorio no ha sido informado.'
    		})
    	}

    	let ticketAtender = ticketControl.atenderTicket(data.escritorio);

    	callback(ticketAtender);
    	
    	// Emitir un evento ultimosCuatro a todos los clientes
    	client.broadcast.emit('ultimosCuatro', { ultimosCuatro: ticketControl.ultimos() });

    });

});