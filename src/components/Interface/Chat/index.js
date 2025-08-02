
function createChatUi() {

	const $chat = $(`
		<div class="c-actions__item c-msg-box">
			<input name="message_field" class="btn btn--secondary c-msg-box__field" type="text" placeholder="Aperte ENTER para escrever" autocomplete="off"/>
		</div>
  `);

	$chat.find('[name="message_field"]').on('keyup', handleSendMsg);

	return $chat;
}

function showMsg(charId, msg) {

	const $container = $(`#${charId} .c-char__dialog`);
	const $msg = $(`<p class="c-char__msg">${msg}</p>`);
	const duration = msg.length > 30 ? 10000 : 5000;

	$container.html($msg);

	setTimeout(() => $msg.addClass('c-char__msg--show'), 50);
	setTimeout(function () {
		$msg.removeClass("c-char__msg--show");
		setTimeout(() => $msg.remove(), 500);
	}, duration);
}

async function handleSendMsg(event) {

	const $messageField = $(event.currentTarget);
	if (event.keyCode === keyEsc) {
		$messageField.val("").blur();
		return;
	}

	if (event.keyCode !== keyEnter)
		return;

	const msg = $messageField.val();
	if (msg.trim() === '')
		return;

	try {

		const result = await sendEvent({
			type: "MSG",
			data: {
				playerId: playerData.id,
				msg: msg,
			},
		});

		if (result?.status === EventStatus.erro) {
			toastError(result);
			return;
		}

		showMsg(playerData.id, msg);
		$messageField.val("").blur();
	}
	catch (error) {
		ToastContainer.error(`[${error.cause}] ${error.message ?? 'Falha ao enviar mensagem'}`);
	}
}