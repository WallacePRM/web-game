function createOptionsUi() {

	const $options = $(`
		<div name="btn_logout" class="c-actions__item btn btn--secondary" title="Sair">
				<i class="fa-solid fa-power-off" />
		</div>
  `);

	$options.on('click', handleLogoff);
	return $options
}

async function handleLogoff() {

	playMenuSong("menu2");

	try {
		await sendEvent({
			type: "LEAVE",
			data: {
				playerId: playerData.id,
			},
		});
	}
	catch (error) {
		ToastContainer.error(`[${error.cause}] ${error.message ?? 'Falha ao desconectar'}`);
	}
}