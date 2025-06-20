
jQuery(() => {

	createSkinSelect();

	$('[name="char_skin_name"]').on('change', handleChangeCharSkin);
	$('[name="music_theme_control"]').on('click', handleToggleMusicTheme);
	$('[name="btn_character_creation"]').on('click', handleGotoCharacterCreation);
	$('[name="btn_initial_game"]').on('click', handleGoToInitialGame);
	$('[name="btn_thanks"]').on('click', handleShowOptions);
	$('[name="btn_start"]').on('click', handleStartAdventure);
	$('[name="btn_continue"]').on('click', handleContinueAdventure);

	if (playerData.id) {
		$('[name="btn_character_creation"]').removeClass('btn--primary').addClass('btn--secondary');
		$('[name="btn_continue"]').closest('.c-login__form__item').fadeIn('slow');
	}

	initAnimations();
	initOpeningMusic();

	checkServerConnection();
});

function checkServerConnection() {

	wsClient = new WebSocket(urlWsServer);

	wsClient.onopen = () => {

		$('.status').html('Conectado').css('color', 'green');
	};

	wsClient.onclose = () => {

		$('.status').html('Desconectado').css('color', 'red');

		setTimeout(() => {

			checkServerConnection();
		}, 3000);

	};

	wsClient.onmessage = (wsEvent) => {

		const event = JSON.parse(wsEvent.data);
		catchEvents([event]);
	};
}

function createSkinSelect() {

	for (let i = 0; i < SpriteList.length; i++) {

		$('.skin').append(`<option skin="${SpriteList[i]}">${mapSpriteToName(SpriteList[i])}</option>`);
	}

	$('[name="char_skin_img"]').attr('src', `assets/img/sprites/${SpriteList[0]}`)
};

function initAnimations() {

	$('.c-logo__title').css('opacity', 1);
	setTimeout(() => $('.c-logo__description').css('opacity', 1), 1000);
	$('.c-logo__img').css('top', '-6rem').css('opacity', 1);
	$('[name="initial_game"]').fadeIn('5000');
};

function initOpeningMusic() {

	const audio = $('[name="music_theme"]')[0];
	audio.volume = .7;
	audio.playbackRate = .5;
	audio.loop = true;
	$('[name="music_theme_control"]').click();
};

let gameLoopingIntervalId = null;
async function startGame(character) {

	addLoad();

	try {
		playerData.name = character.name;

		createLivingWorld();

		await sendEvent({
			type: 'ENTER',
			data: character
		});

		$(document).keydown(handleOnKeyDown);
		$(document).keyup(handleOnKeyUp);
		$('[name="message_field"]').keydown(handleSendMsg);
		$('.btn-char').on('click', startGame);

		loadPlayers();

		gameLoopingIntervalId = setInterval(gameLooping, 1000 / 15);

		$('.c-login').fadeOut(1000);
		setTimeout(() => $('.c-login').remove(), 1000)
		setTimeout(() => $('[name="living_world"]').fadeIn('slow'), 2000);
		setTimeout(() => $('.c-actions').fadeIn('3000'), 2000);
		playAmbianceSong();
	}
	catch (error) {

		console.error('Falha ao entrar no mundo: ', `[${error.message}]`);
	}
	finally {
		removeLoad();
	}
}

function handleGotoCharacterCreation() {

	addLoad();

	playMenuSong('menu2');

	$('[name="initial_game"]').fadeOut(1000);
	setTimeout(() => $('[name="character_creation"]').fadeIn('slow'), 1000);
	setTimeout(() => removeLoad(), 2000);

};

function handleGoToInitialGame() {

	addLoad();

	playMenuSong('menu1');

	$('[name="character_creation"]').fadeOut(1000);
	setTimeout(() => $('[name="initial_game"]').fadeIn('slow'), 1000);
	setTimeout(() => removeLoad(), 2000);
};

function handleShowOptions() {

	playMenuSong('menu1');

	const $options = $(`
         <div class="c-options">
            <div class="c-options__header">
                <h3 class="c-options__title">Agradecimentos</h3>
            </div>
            <div class="c-options__content" style="text-align: center; padding: 2rem;">
                <p class="c-options__item__label"> Um agradecimento especial ao Pixabay e seus autores que contribuiram com as trilhas sonoras, muito obrigado! </p>
                <p class="c-options__item__label">
                    - Guilherme Bernardes - </br>
                    - UNIVERSFIELD -
                </p>
            </div>
            <div class="c-options__footer">
                <div name="btn_hide_options" class="c-options__item btn--interactive">
                    <i class="c-options__item__icon fa-solid fa-arrow-right-from-bracket mirrored"></i>
                    <span class="c-options__item__label ml-10" >Voltar para o jogo</span>
                </div>
            </div>
        </div>
    `);

	$options.find('[name="btn_hide_options"]').on('click', handleHideOptions);

	$('.c-modal__container').append($options);
	$('.c-modal').fadeIn('500');
}

function handleHideOptions() {

	playMenuSong('menu1');

	$('.c-modal').fadeOut('500');
	setTimeout(() => $('.c-options').remove(), 500);
}

function handleChangeCharSkin(e) {

	const skinName = mapNameToSprite(e.currentTarget.value)
	$('[name="char_skin_img"]').attr('src', 'assets/img/sprites/' + skinName);
};

function handleToggleMusicTheme() {

	const audio = $('[name="music_theme"]')[0];

	if (audio.paused) {

		$('.c-music-reaction').addClass('music-animation');
		$('.c-music-control__play-pause').removeClass('fa-play').addClass('fa-pause');
		audio.play();
	}
	else {
		$('.c-music-reaction').removeClass('music-animation');
		$('.c-music-control__play-pause').removeClass('fa-pause').addClass('fa-play');

		audio.pause();
	}
};

function handleStartAdventure(e) {

	e.preventDefault();

	const form = $('[name="character_creation"]')[0];
	const character = {
		name: form.nick.value,
		skin: mapNameToSprite(form.char_skin_name.value)
	};

	if (character.name.trim('') === '') {

		$(form.nick).addClass('invalid');
		return;
	}

	$(form.nick).removeClass('invalid');

	playMenuSong('menu3');

	playerData = {
		id: null,
		name: null
	};

	startGame(character);
};

function handleContinueAdventure() {

	playMenuSong('menu3');

	startGame(playerData);
}

