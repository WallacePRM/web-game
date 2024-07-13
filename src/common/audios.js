const menuSoundTrack = {
    menu3: new Audio(`assets/audios/new_game.mp3`),
    menu2: new Audio(`assets/audios/menu_2.mp3`),
    menu1: new Audio(`assets/audios/menu_1.mp3`),
    volume: 0.7,
};

const ambianceSoundTrack = {
    ambiance1: new Audio(`assets/audios/ambiance.mp3`),
    volume: .7
}

const stepSoundTrack = {
    step1: new Audio(`assets/audios/step1.mp3`),
    volume: .5
}

async function canPlayAudio() {

    const audio = new Audio('assets/audios/silence.mp3');
    if (audio.canPlayType('audio/mpeg') === 'probably') {
        
        try {

           await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        catch (error) {
            
            console.error('Erro ao obter permissão de microfone:', error);
        }
    }
};

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

function playAmbianceSong(song) {

    const sound = $('[name="living_word_theme"]')[0] || ambianceSoundTrack.ambiance1;
    sound.volume = ambianceSoundTrack.volume;
    sound.playbackRate = .5;
    sound.loop = true;

    if (!sound.paused) {
        sound.currentTime = 0;
    }
    else {
        sound.play();
    }
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