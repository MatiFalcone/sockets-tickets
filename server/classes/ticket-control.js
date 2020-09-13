const fs = require('fs');

class Ticket {

	constructor(numero, escritorio) {

		this.numero = numero;
		this.escritorio = escritorio;

	}

}

class TicketControl {

	constructor() {

		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.ticketsPendientes = [];
		this.ultimos4 = [];

		let data = require('../data/data.json');

		if (data.hoy === this.hoy ) {
			// Continuo en el dia de trabajo, recupero la info del archivo data.json
			this.ultimo = data.ultimo;
			this.ticketsPendientes = data.ticketsPendientes;
			this.ultimos4 = data.ultimos4;
		} else {
			// Arranco con los valores en 0 porque es un nuevo dia
			this.reiniciarDia();
		}

	}

	siguiente() {

		// Incremento en 1 el contador de tickets
		this.ultimo += 1;
		
		// Creo un nuevo ticket con el número del último ticket y el escritorio aun no lo sé
		let ticket = new Ticket(this.ultimo, null);
		// Lo agrego a la cola de tickets pendientes
		this.ticketsPendientes.push(ticket);

		// Persisto la información en archivo
		this.grabarArchivo();

		return `Ticket ${ this.ultimo }`;
	
	}

	ultimoTicket() {
		return `Ticket ${ this.ultimo }`;
	}

	ultimos() {

		return this.ultimos4;

	}


	atenderTicket(escritorio) {

		if (this.ticketsPendientes.length === 0) {
			return 'No hay tickets pendientes';
		}

		// Recupero el numero del primer ticket pendiente
		let numeroTicket = this.ticketsPendientes[0].numero;
		// Borro el primer elemento del array
		this.ticketsPendientes.shift();

		// Creo una nueva instancia de un ticket a atender
		let atenderTicket = new Ticket(numeroTicket, escritorio);
		// Lo ubico como primero de la lista de ultimos 4
		this.ultimos4.unshift(atenderTicket);

		if (this.ultimos4.length > 4) {
			this.ultimos4.splice(-1,1); // Borra el último elemento
		}

		console.log('Ultimos cuatro: ', this.ultimos4);

		this.grabarArchivo();

		return atenderTicket;

	}

	reiniciarDia() {
		
		// Reinicio la info
		this.ultimo = 0;
		this.ticketsPendientes = [];
		this.ultimos4 = [];

		// Persisto la informacion en archivo
		this.grabarArchivo();

		console.log('Se ha inicializado el sistema.');

	}

	grabarArchivo() {

		// Armo el JSON
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			ticketsPendientes: this.ticketsPendientes,
			ultimos4: this.ultimos4
		}

		// Lo paso a String
		let jsonDataString = JSON.stringify(jsonData);

		// Grabo fisicamente el archivo
		fs.writeFileSync('./server/data/data.json', jsonDataString);

	}

}

module.exports = {
	TicketControl
}