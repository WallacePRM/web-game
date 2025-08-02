
async function loadPlayers() {
	try {
		const players = await getPlayers();
		console.log({players});
		if (playerData.id) {
			const hasPlayer = players.some((player) => {
				return player.id === playerData.id;
			});

			if (!hasPlayer) {
				playerData.id = null;
				saveData();
				window.location.assign(".");
			}
		}

		for (const player of players) {
			createPlayer(player);
		}
	}
	catch (error) {
		ToastContainer.error(`[${error.cause}] ${error.message ?? 'Falha ao carregador jogadores'}`);
	}
}

function createWorld() {

	if ($('.c-worlds').length > 0)
		return;

	const $worlds = $('<div class="c-worlds"></div>');

	setTimeout(() => {
		$(document).keydown(handleMove);
		$(document).keyup(handleStopMove);
		$(document).focus(handleStopMove)
	}, 2500);

	$('.c-game').append($worlds);

	createOverworld();
}

function createOverworld() {

	if ($('[name="overworld"]').length > 0)
		return;

	const $overworld = $(`
		<div name="overworld" class="c-worlds__item grass-green" style="display: none;">
				<audio name="living_word_theme" src="assets/audios/theme_1.mp3" loop autoplay tab="-1"></audio>
		</div>
	`);

	$('.c-worlds').prepend($overworld);
}

function gameLooping() {
	for (let prop in charMap) {
		const char = charMap[prop];
		char.updateView();
	}

	handleMoveChar();
}

function stopMove(event) {

	const keyIndex = keysPressed.indexOf(event.keyCode);
	const currentKey = keysPressed[0];
	keysPressed.splice(keyIndex, 1);

	if (keysPressed.length !== 0)
		return;

	const char = charMap[playerData.id];
	if (char === undefined)
		return;

	const direction = mapKeyToDirection(currentKey);
	const sprite = mapDirectionToSprite(direction, false);

	char.setView(sprite);

	sendEvent({
		type: "STOP_MOVE",
		data: {
			playerId: playerData.id,
			direction: direction,
		},
	});

	stopStepSong("step1");
}

function moveChar(direction, charId) {

	const char = charMap[charId];
	if (!char)
		return;

	const prop = direction === "left" || direction === "right" ? "left" : "top";
	const increase = direction === "bottom" || direction === "right";

	const $char = $(`#${charId}`);

	let position = parseInt($char.css(prop));
	const worldHeigth = parseInt($('[name="overworld"]').css("height"));
	const worldWidth = parseInt($('[name="overworld"]').css("width"));
	const charHeight = parseInt($char.css("height"));
	const charWidth = parseInt($char.css("width"));

	if (increase) {
		position = position + speed;
	} else {
		position = position - speed;
	}

	if (position < 0) {
		return;
	}
	if (prop === "left" && position > worldWidth - charWidth) {
		return;
	}
	if (prop === "top" && position > worldHeigth - charHeight) {
		return;
	}

	$char.css(prop, position + "px");

	if (direction === "top") {
		char.setView("runningBack");
	}
	if (direction === "bottom") {
		char.setView("runningFront");
	}
	if (direction === "left") {
		char.setView("runningRight");
	}
	if (direction === "right") {
		char.setView("runningLeft");
	}

	return {
		top: parseInt($char.css("top")),
		left: parseInt($char.css("left")),
	};
}

function mapKeyToDirection(key) {
	switch (key) {
		case keyUp:
			return "top";
		case keyDown:
			return "bottom";
		case keyLeft:
			return "left";
		case keyRight:
			return "right";
	}
}

function mapDirectionToSprite(direction, running) {
	const action = running ? "running" : "";
	let sprite = '';

	switch (direction) {
		case "top":
			sprite = action + "Back";
			break;
		case "bottom":
			sprite = action + "Front";
			break;
		case "left":
			sprite = action + "Left";
			break;
		case "right":
			sprite = action + "Right";
			break;
	}

	if (!running) {
		sprite = sprite.toLowerCase();
	}

	return sprite;
}

function createPlayer(player) {
	if ($(`#${player.id}`).length > 0)
		return;

	const playerHtml = $(`
        <div class="c-char" id="${player.id}">
            <div class="c-char__info">
                <span class="c-char__info__name">&lt; ${player.name} &gt;</span>
            </div>
            <div class="c-char__skin"></div>
						<div class="c-char__dialog"></div>
        </div>
    `);

	if (player.position !== undefined) {
		playerHtml.css("top", `${player.position.top}px`);
		playerHtml.css("left", `${player.position.left}px`);
	}
	$('[name="overworld"]').append(playerHtml);

	setTimeout(() => {
		const char = createSprite(player.id, player.skin);
		char.updateView();
	}, 0);
}

function createSprite(playerId, skin) {
	const char = new SpritesController($(`#${playerId} .c-char__skin`)[0], Sprite(skin));
	char.setView(`front`);

	charMap[playerId] = char;

	return char;
}

function goToLogin() {

	addLoad();

	clearInterval(gameLoopingIntervalId);

	$(document).off('keydown');
	$(document).off('keyup');
	$('.c-worlds').fadeOut("1000");
	$(".c-actions").fadeOut("1000");

	setTimeout(() => {
		$('.c-worlds').remove();
		$(".c-actions").remove();
	}, 1000);

	setTimeout(() => createLogin(), 1000);
	setTimeout(() => removeLoad(), 2000);
}

function handleMoveChar() {
	if (!playerData.id)
		return;

	const lastKey = keysPressed[keysPressed.length - 1];
	if (lastKey === undefined)
		return;

	const $char = $(`#${playerData.id}`);
	const direction = mapKeyToDirection(lastKey);
	const position = moveChar(direction, playerData.id);
	playerData.position = position;

	saveData();

	sendEvent({
		type: "MOVE",
		data: {
			direction: direction,
			playerId: playerData.id,
			position: {
				top: parseInt($char.css("top")),
				left: parseInt($char.css("left"))
			},
		},
	});
}

function handleMove(event) {
	if ($(event.target).is("input")) return;

	if (event.keyCode === keyEnter) {
		event.preventDefault();
		event.stopPropagation();

		stopMove(event);
		$('[name="message_field"]').focus();

		return;
	}

	if (keys.indexOf(event.keyCode) === -1) return;

	if (keysPressed.indexOf(event.keyCode) === -1) {
		keysPressed.push(event.keyCode);
	}

	playStepSong("step1");
}

function handleStopMove(event) {
	if ($(event.target).is("input") || keys.indexOf(event.keyCode) === -1) return;

	stopMove(event);
}


