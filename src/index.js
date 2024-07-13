jQuery(async () => {

    loadData();
    canPlayAudio();
});

function createLivingWorld() {

    const $livingWorld = (`
        <div name="living_world" class="c-worlds__item grass-green" style="display: none;">
            <audio name="living_word_theme" src="assets/audios/theme-1.mp3" loop autoplay></audio>
            <div class="dirt" style="grid-row-start: 3;grid-row-end: 7;grid-column-start: 7;"></div>
            <div class="dirt" style="grid-row-start: 1;grid-row-end: 4;grid-column-start: 6;"></div>
            <div class="dirt" style="grid-row-start: 9;grid-row-end: 11;grid-column-start: 4;"></div>
            <div class="dirt" style="grid-row-start: 10;grid-row-end: 10;grid-column-start: 3;grid-column-end: 6;"></div>
            <div class="dirt" style="grid-row-start: 5;grid-row-end: 8;grid-column-start: 5;grid-column-end: 7;"></div>
            <div class="dirt" style="grid-row-start: 2;grid-row-end: 4;grid-column-start: 2;grid-column-end: 2;"></div>
            <div class="dirt" style="grid-row-start: 6;grid-row-end: 9;grid-column-start: 4;grid-column-end: 6;"></div>
        </div>    
    `);

    $('.c-worlds').prepend($livingWorld);
}

function createLogin() {

    const $login = $(`
        
         <div class="c-login" style="display: none">
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
                                <button name="btn_continue" class="btn btn--primary" type="button">Continuar Jornada</button>
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
                                    <i name="btn_initial_game" class="c-login__form__item__buttons__icon fa fa-caret-left btn--interactive"></i>
                                    <button name="btn_start" class="btn btn--primary btn--interactive" type="button">Iniciar jornada</button>
                                </div>
                            </div>
                          
                        </form>
                    </div>
                    <div class="c-music-control" name="music_theme_control">
                        <!-- <iframe src="assets/audios/silence.mp3" allow="autoplay" id="audio" style="display: none"></iframe> -->
                        <audio name="music_theme" src="assets/audios/theme-2.mp3" loop autoplay></audio>
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

    createSkinSelect();
    initAnimations();
    initOpeningMusic();

    wsConnect();
}

function addLoad() {

    const $load = $(`<div class="c-load"></div>`);
    $('.c-game').append($load);
}

function removeLoad() {

    $('.c-load').remove();
}