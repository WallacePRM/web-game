const menuSoundTrack = {
	menu3: new Audio(`assets/audios/new_game.mp3`),
	menu2: new Audio(`assets/audios/menu_2.mp3`),
	menu1: new Audio(`assets/audios/menu_1.mp3`),
	volume: 0.7,
};

const ambianceSoundTrack = {
	ambiance1: new Audio(`assets/audios/ambiance_1.mp3`),
	volume: .7
};

const stepSoundTrack = {
	step1: new Audio(`assets/audios/step_1.mp3`),
	volume: .5
};

const themeSoundTrack = {
	theme1: new Audio(`assets/audios/theme_1.mp3`),
	theme2: new Audio(`assets/audios/theme_2.mp3`),
	volume: .7
};

async function canPlayAudio() {

	const audio = new Audio('assets/audios/silence.mp3');
	if (audio.canPlayType('audio/mpeg') === 'probably') {
		try {
			await audio.play();
		}
		catch (error) {
			console.error(`[${error.cause}] ${error.message ?? 'Falha ao reproduzir áudio'}`);
		}
	}
}

function playMenuSong(song) {

	const sound = menuSoundTrack[song || 'menu1'];
	sound.volume = menuSoundTrack.volume;

	if (!sound.paused) {
		sound.currentTime = 0;
	}
	else {
		sound.play();
	}
}

function playAmbianceSong(song, playbackRate) {

	const sound = $('[name="living_word_theme"]')[0] || (ambianceSoundTrack[song || 'ambiance1']);
	sound.volume = ambianceSoundTrack.volume;
	sound.playbackRate = playbackRate ?? .5;
	sound.loop = true;

	if (!sound.paused) {
		sound.currentTime = 0;
	}
	else {
		sound.play();
	}
}

function playThemeSong(song, playbackRate) {

	const sound = themeSoundTrack[song || 'theme1'];
	sound.volume = themeSoundTrack.volume;
	sound.playbackRate = playbackRate ?? .5;
	sound.loop = true;

	sound.play();
}

function playStepSong(song) {

	const sound = stepSoundTrack[song || 'step1'];
	sound.volume = stepSoundTrack.volume;
	sound.loop = true;
	sound.playbackRate = 1.5;

	sound.play();
}

function stopStepSong(song) {

	const sound = stepSoundTrack[song || 'step1'];
	sound.volume = stepSoundTrack.volume;
	sound.loop = true;

	sound.pause();
}

class AudiosController {


}