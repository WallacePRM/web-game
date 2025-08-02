function createInterface() {

	const $interface = $(`<div class="c-actions" style="display: none"></div>`);
	const $chat = createChatUi();
	const $Options = createOptionsUi();

	$interface.append($chat);
	$interface.append($Options);

	$('.c-game').append($interface);
}