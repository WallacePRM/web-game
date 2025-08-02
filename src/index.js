let ToastContainer;
jQuery(async () => {

	loadData();
	canPlayAudio();
	createLogin();
	ToastContainer = new Toast(10000, {
		showTimer: true
	});

	startServerConnection();

	// window.addEventListener('beforeunload', closeConnection);
});

function startServerConnection() {

	if (wsClient)
		return;

	wsClient = new WebSocket(urlWsServer);

	wsClient.onopen = () => {
		$('.status').html('Conectado').css('color', 'rgb(var(--green-color))');
	};

	wsClient.onclose = () => {
		$('.status').html('Desconectado').css('color', 'rgb(var(--red-color))');

		setTimeout(() => {
			startServerConnection();
		}, 3000);

	};

	wsClient.onmessage = (wsEvent) => {
		const event = JSON.parse(wsEvent.data);
		if (!event.data)
			return;

		if (event.id && pendingResponses[event.id]) {
			pendingResponses[event.id](event);
			delete pendingResponses[event.id];
		}

		catchEvents([event]);
	};
}

function checkServerConnection() {

	if (!wsClient)
		return;

	if (wsClient.OPEN) {
		$('.status').html('Conectado').css('color', 'rgb(var(--green-color))');
	}
	else if (wsClient.CLOSED) {
		$('.status').html('Desconectado').css('color', 'rgb(var(--red-color))');
	}
	else {
		$('.status').html('Estabelecendo conexão...').css('color', 'rgb(var(--title-color))');
	}
}

// Controlar recepção de eventos do lado do cliente através de uma variável
// async function closeConnection(event) {

// 	event.preventDefault();
// 	event.returnValue = "Deseja realmente sair?";

// 	if (wsClient && wsClient.readyState === WebSocket.OPEN && playerData.id) {
// 		const leaveEvent = JSON.stringify({
// 			id: generateEventId(),
// 			type: "LEAVE",
// 			data: { playerId: playerData.id }
// 		});
// 		try {
// 			wsClient.send(leaveEvent);
// 		} catch (e) {
// 			console.warn("Não foi possível enviar LEAVE ao fechar:", e);
// 		}
// 	}
// }