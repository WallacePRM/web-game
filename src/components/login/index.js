
let gameLoopingIntervalId = null;

function createLogin() {

	if ($('.c-login').length > 0)
		return;

	const $login = $(`
		<div class="c-login">
			<div class="c-login__container">
					<div class="c-logo">
							<h1 class="c-logo__title">Queenia</h1>
							<h6 class="c-logo__description">O último reino</h6>
							<div class="c-logo__img">
									<svg width="450" height="281" viewBox="0 0 450 281" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M407 91H424V106H422C413.716 106 407 99.2843 407 91V91Z" fill="#9D3434" class="svg-elem-1"></path>
											<path d="M450 96L421.5 100.33V91.6699L450 96Z" fill="#9D3434" class="svg-elem-2"></path>
											<path d="M450 102L421.5 106.33V97.6699L450 102Z" fill="#9D3434" class="svg-elem-3"></path>
											<path d="M219 77H267C273.075 77 278 81.9249 278 88V88H219V77Z" fill="#9D3434" class="svg-elem-4"></path>
											<path d="M259 84H413C419.075 84 424 88.9249 424 95V95H270C263.925 95 259 90.0751 259 84V84Z" fill="#9D3434" class="svg-elem-5"></path>
											<path d="M204 143H220V231C220 239.837 212.837 247 204 247V247V143Z" fill="#A1A9B2" class="svg-elem-6"></path>
											<path d="M219.5 257L209.541 232.25H229.459L219.5 257Z" fill="#A1A9B2" class="svg-elem-7"></path>
											<path d="M219 143H235V257H219V143Z" fill="#D1D7DD" class="svg-elem-8"></path>
											<rect x="204" y="140" width="31" height="3" fill="#E09A30" class="svg-elem-9"></rect>
											<rect x="170" y="130" width="99" height="10" fill="#D7C73A" class="svg-elem-10"></rect>
											<rect x="179" y="123" width="80" height="7" fill="#E09A30" class="svg-elem-11"></rect>
											<rect x="206" y="55" width="26" height="68" fill="#60503E" class="svg-elem-12"></rect>
											<path d="M206 84.381H232M206 68H232M206 95.6429H232M206 111H232" stroke="#4E4234" class="svg-elem-13"></path>
											<path d="M201 42.2085C201 32.2673 209.059 24.2085 219 24.2085V24.2085C228.941 24.2085 237 32.2673 237 42.2085V55.2085C237 57.9699 234.761 60.2085 232 60.2085H206C203.239 60.2085 201 57.9699 201 55.2085V42.2085Z" fill="#E09A30" class="svg-elem-14"></path>
											<path d="M234.889 48.4127C234.802 49.6648 233.716 50.6091 232.464 50.5217L222.261 49.8096C215.374 49.329 210.181 43.3565 210.662 36.4697L210.879 33.3522C211.24 28.1871 215.719 24.2922 220.884 24.6527V24.6527C229.493 25.2535 235.984 32.7191 235.384 41.3277L234.889 48.4127Z" fill="#D7C73A" class="svg-elem-15"></path>
											<rect x="204" y="71" width="31" height="11" rx="1" fill="#9D3434" class="svg-elem-16"></rect>
									</svg>
							</div>
					</div>
					<div class="c-login__screen">
							<form class="c-login__form" name="initial_game" onsubmit="(e) => e.preventDefault()" style="display: none;">
									<div class="c-login__form__item" style="display: none;">
											<button name="btn_continue" class="btn btn--primary" type="button">Continuar</button>
									</div>
									<div  class="c-login__form__item btn--interactive">
											<button name="btn_character_creation" class="btn btn--primary" type="button">Nova história</button>
									</div>
									<div  class="c-login__form__item btn--interactive">
											<button name="btn_thanks" class="btn btn--secondary" type="button">Agradecimentos</button>
									</div>
							</form>
							<form class="c-login__form" name="character_creation" onsubmit="(e) => e.preventDefault()" style="display: none;">
									<div class="c-login__form__item btn--interactive">
											<label class="c-login__form__item__label">Personagem</label>
											<input onkeypress="playMenuSong('menu1')" class="btn btn--secondary" name="nick" type="text" placeholder="Nome do personagem" required>
									</div>
									<div class="c-login__form__item btn--interactive">
											<label  class="c-login__form__item__label">Título</label>
											<select onchange="playMenuSong('menu1')" name="char_skin_name" class="btn btn--secondary skin"></select>
											<div class="c-game-char-skin">
													<img name="char_skin_img" class="c-game-char-skin__img">
											</div>
									</div>
									<div class="c-login__form__item btn--interactive">
											<div class="c-login__form__item__buttons">
													<button name="btn_initial_game" class="btn btn--interactive" type="button">
														<i class="c-login__form__item__buttons__icon fa fa-caret-left"></i>
													</button>
													<button name="btn_start" class="btn btn--primary" type="button">Iniciar jornada</button>
											</div>
									</div>
							</form>
					</div>
					<div class="c-music-control" name="music_theme_control">
						<audio name="music_theme" src="assets/audios/theme_2.mp3" tabindex="-1" disable></audio>
						<div class="c-music-reaction">
							<div class="c-music-reaction__item c-music-reaction__item--1"></div>
							<div class="c-music-reaction__item c-music-reaction__item--2"></div>
							<div class="c-music-reaction__item c-music-reaction__item--3"></div>
						</div>
						<p>Never again</p>
						<i class="c-music-control__play-pause fa fa-play ml-10"></i>
					</div>
					<div class="c-status">
							<p>Status do Servidor:</p>
							<p class="status">Estabelecendo conexão...</p>
					</div>
			</div>
	</div>
	`);

	if (playerData.id) {
		$login.find('[name="btn_character_creation"]').removeClass('btn--primary').addClass('btn--secondary');
		$login.find('[name="btn_continue"]').closest('.c-login__form__item').fadeIn('slow');
	}

	$login.find('[name="char_skin_name"]').on('change', handleChangeCharSkin);
	$login.find('[name="music_theme_control"]').on('click', handleToggleMusicTheme);
	$login.find('[name="btn_character_creation"]').on('click', handleGotoCharacterCreation);
	$login.find('[name="btn_initial_game"]').on('click', handleGoToInitialGame);
	$login.find('[name="btn_thanks"]').on('click', handleShowOptions);
	$login.find('[name="btn_start"]').on('click', handleStartAdventure);
	if (playerData.id) {
		$login.find('[name="btn_character_creation"]').removeClass('btn--primary').addClass('btn--secondary');
		$login.find('[name="btn_continue"]').closest('.c-login__form__item').fadeIn('slow');
	}
	$login.find('[name="btn_continue"]').on('click', handleContinueAdventure);

	$('.c-game').prepend($login)

	createSpriteSelect();
	setTimeout(() => {
		initialAnimations()
		initOpeningMusic();
	}, 0);

	checkServerConnection();
}

function createSpriteSelect() {

	for (let i = 0; i < SpritesList.length; i++) {

		$('.skin').append(`<option skin="${SpritesList[i]}">${mapSpriteToName(SpritesList[i])}</option>`);
	}

	$('[name="char_skin_img"]').attr('src', `assets/img/sprites/${SpritesList[0]}`);
}

function initialAnimations() {

	$('.c-logo__title').css('opacity', 1);
	setTimeout(() => $('.c-logo__description').css('opacity', 1), 1000);
	$('.c-logo__img').css('top', '-6rem').css('opacity', 1);
	$('[name="initial_game"]').fadeIn('5000');
}

function transitionAnimation() {
	$('.c-login').fadeOut(1000);
	setTimeout(() => $('.c-login').remove(), 1000)
	setTimeout(() => $('[name="overworld"]').fadeIn('slow'), 2000);
	setTimeout(() => $('.c-actions').fadeIn('slow'), 2000);
}

function initOpeningMusic() {

	const audio = $('[name="music_theme"]')[0];
	audio.volume = .7;
	audio.playbackRate = .5;
	audio.loop = true;

	$('[name="music_theme_control"]').click();
	setTimeout(() => {
		if (audio.paused)
			audio.play();
	}, 100)
}

async function startGame(character) {

	addLoad();

	try {
		const result = await sendEvent({
			type: 'ENTER',
			data: character
		});

		if (result?.status === EventStatus.error) {
			toastError(result);
			return;
		}

		saveData(result?.data);
		createInterface();
		createWorld();
		loadPlayers();

		setTimeout(() => {
			playAmbianceSong();
			transitionAnimation();
		}, 0);

		playMenuSong('menu3');
		gameLoopingIntervalId = setInterval(gameLooping, 1000 / 15);
	}
	catch (error) {
		ToastContainer.error(`[${error.cause}] ${error.message ?? 'Falha ao carregar mundo'}`);
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

}

function handleGoToInitialGame() {

	addLoad();

	playMenuSong('menu1');

	$('[name="character_creation"]').fadeOut(1000);
	setTimeout(() => $('[name="initial_game"]').fadeIn('slow'), 1000);
	setTimeout(() => removeLoad(), 2000);
}

function handleShowOptions(e) {

	e.stopPropagation();

	playMenuSong('menu1');

	if ($('.c-modal .c-options').length === 0) {

		const $options = $(`
			<div class="c-options">
				<div class="c-options__header">
						<h3 class="c-options__title">Agradecimentos</h3>
				</div>
				<div class="c-options__content" style="text-align: center; padding: 2rem;">
						<p class="c-options__item__label"> Um agradecimento especial ao <a target="__blank" href="https://pixabay.com/pt/" class="accent-color">Pixabay</a> e seus autores que contribuiram com as trilhas sonoras, muito obrigado! </p>
						<p class="c-options__item__label" >
								<a class="accent-color" target="__blank" href="https://pixabay.com/pt/users/guilhermebernardes-24203804/">Guilherme Bernardes</a></br>
								<a class="accent-color" target="__blank" href="https://pixabay.com/pt/users/universfield-28281460/">Universfield</a>
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
		$options.on('click', e => e.stopPropagation());

		$('.c-modal__container').append($options);
	}

	$('.c-modal').fadeIn('500');
	$(document).on('click', handleHideOptions);
}

function handleHideOptions() {

	playMenuSong('menu1');

	$('.c-modal').fadeOut('500');
	setTimeout(() => $('.c-options').remove(), 500);

	$(document).off('click', handleHideOptions);
}

function handleChangeCharSkin(e) {

	const skinName = mapNameToSprite(e.currentTarget.value)
	$('[name="char_skin_img"]').attr('src', 'assets/img/sprites/' + skinName);
}

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
}

function handleStartAdventure(e) {

	e.preventDefault();

	const form = $('[name="character_creation"]')[0];
	const char = {
		name: form.nick.value,
		skin: mapNameToSprite(form.char_skin_name.value),
		poisition: null
	};

	if (char.name.trim('') === '') {
		$(form.nick).addClass('invalid');
		playMenuSong('menu1');
		return;
	}

	$(form.nick).removeClass('invalid');

	startGame(char);
}

function handleContinueAdventure() {

	playMenuSong('menu3');

	startGame(playerData);
}

