
jQuery(() => {

    $('[name="btn_logout"]').on('click', handleLogoff);
});

function gameLooping() {

    for (let prop in charMap) {

        const char = charMap[prop];
        char.updateView();
    }

    handleMoveChar();

    let seconds = (new Date() - lastDate) / 1000;

    /*if (seconds > 0.3) {

        lastDate = new Date();

        getNewEvents();
    }*/
}

function showMsg(charId, msg) {

    const $char = $('#' + charId);
    const duration = msg.length > 30 ? 8000 : 3000;

    $char.append(`<span class="c-char__msg c-char__msg--show">${msg}</span>`);
    setTimeout(function(){

        $char.find('.c-char__msg').removeClass('c-char__msg--show');
        setTimeout(() => $char.find('.c-char__msg').remove(), 500);
    }, duration);
}

function moveChar(direction, charId) {

    const prop = direction === 'left' || direction === 'right' ? 'left' : 'top';
    const increase = direction === 'bottom' || direction === 'right';

    const $char =  $(`#${charId}`);

    let position = parseInt($char.css(prop));
    const worldHeigth = parseInt($('[name="living_world"]').css('height'));
    const worldWidth = parseInt($('[name="living_world"]').css('width'));
    const charHeight = parseInt($char.css('height'));
    const charWidth = parseInt($char.css('width'));


    if (increase) {
        position = position + speed;
    }
    else {
        position = position - speed;
    }

    if (position < 0) {

        return;
    }
    if (prop === 'left' && position > (worldWidth - charWidth)) {

        return;
    }
    if (prop === 'top' && position > (worldHeigth - charHeight)) {

        return;
    }

    $char.css(prop, position + 'px');

    const char = charMap[charId];

    if (direction === 'top') {

        char.setView('runningBack');
    }
    if (direction === 'bottom') {

        char.setView('runningFront');
    }
    if (direction === 'left') {

        char.setView('runningRight');
    }
    if (direction === 'right') {

        char.setView('runningLeft');
    }

   return {
       top: parseInt($char.css('top')),
       left: parseInt($char.css('left'))
   }
};

function sendEvent(event) {

    /*return fetchJson(urlServer + `/event?type=${event.type}`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });*/

    const promise = new Promise((resolve, reject) => {

        if (wsClient.readyState !== WebSocket.OPEN) {

            reject();
        }

        wsClient.send(JSON.stringify(event));

        resolve();
    });

    return promise;
}

function mapKeyToDirection(key) {

    switch(key) {
        case keyUp:
            return 'top';
        case keyDown:
            return 'bottom';
        case keyLeft:
            return 'left';
        case keyRight:
            return 'right';
    }
}

function mapDirectionToSprite(direction, running) {

    const action = running ? 'running' : '';
    let sprite;

    switch(direction) {

        case 'top': sprite = action + 'Back'; break;
        case 'bottom': sprite = action + 'Front'; break;
        case 'left': sprite = action + 'Left'; break;
        case 'right': sprite = action + 'Right'; break;
    }

    if (!running) {

        sprite = sprite.toLowerCase();
    }

    return sprite;
}

function createPlayer(id, name, position) {

    const playerHtml = $(`
        <div class="c-char" id="${id}">
            <div class="c-char__info">
                <span class="c-char__info__name">&lt; ${name} &gt;</span>
            </div>
            <div class="c-char__skin"></div>
        </div>
    `);

    if (position !== undefined) {

        playerHtml.css('top', `${position.top}px`);
        playerHtml.css('left', `${position.left}px`);
    }

    $('[name="living_world"]').append(playerHtml);
}

function getNewEvents() {

    const promise = fetchJson(urlServer + `/events?eventId=${lastEventId}`);

    promise.then( function(events) {

        if (events.length === 0) {

            return;
        }

        let lastEvent = events[events.length - 1];

        const changedId = lastEventId !== lastEvent.id;
        lastEventId = lastEvent.id;

        if (changedId) {

            saveData();
        }

        catchEvents(events);
    });
}

function createSprite(playerId, skin) {

    const char = new SpriteCtrl($(`#${playerId} .c-char__skin`)[0], Sprite(skin));
    char.setView(`front`);

    charMap[playerId] = char;

    return char;
}

async function loadPlayers() {

    try {

        const players = await getPlayers();
        
        if (playerData.id !== null) {

            const hasPlayer = players.some((player) => {

                return player.id === playerData.id;
            });

            if (!hasPlayer) {

                playerData.id = null;
                saveData();
                window.location.assign('.');
            }
        }

        for (let i = 0; i < players.length; i++) {

            createPlayer(players[i].id, players[i].name, players[i].position);
            const char = createSprite(players[i].id, players[i].skin);

            char.updateView();
        }
    }
    catch(error) {

        console.log('Falha ao carregar jogadores');
    }
}

function goToLogin() {

    addLoad();

    $('.c-actions').fadeOut('1000');
    $('[name="living_world"]').fadeOut('1000');

    setTimeout(() => $('[name="living_world"]').remove(), 1000)

    createLogin();
    setTimeout(() => $('.c-login').fadeIn('slow'), 1000);

    setTimeout(() => removeLoad(), 2000);
};

/* ---------- Handle ----------*/

function handleMoveChar() {

    if (playerData.id === null) {

        return;
    }

    const lastKey = keysPressed[keysPressed.length - 1];

    if (lastKey !== undefined) {

        const $char = $(`#${playerData.id}`);

        const direction = mapKeyToDirection(lastKey);

        const position = moveChar(direction, playerData.id);
        playerData.position = position;

        saveData();

        sendEvent({
            type: 'MOVE',
            data: {
                direction: direction,
                playerId: playerData.id,
                position: {
                    top: parseInt($char.css('top')),
                    left: parseInt($char.css('left'))
                }
            }
        });

        
    }
}

function handleOnKeyDown(event) {

    if ($(event.target).is('input')) return;

    if (event.keyCode === keyEnter) {

        event.preventDefault();
        event.stopPropagation();

        $('.action-msg input').focus();

        return;
    }

    if (keys.indexOf(event.keyCode) === -1) return;

    if (keysPressed.indexOf(event.keyCode) === -1) {

        keysPressed.push(event.keyCode);
    }

    playStepSong('step1');
}

function handleOnKeyUp(event) {

    if ($(event.target).is('input') || keys.indexOf(event.keyCode) === -1) return;

    const keyIndex = keysPressed.indexOf(event.keyCode);
    const currentKey = keysPressed[0];
    keysPressed.splice(keyIndex, 1);

    if (keysPressed.length === 0) {

        const char = charMap[playerData.id];

        if (char !== undefined) {

            const direction = mapKeyToDirection(currentKey);
            const sprite = mapDirectionToSprite(direction, false);

            char.setView(sprite);

            sendEvent({
                type: 'STOP_MOVE',
                data: {
                    playerId: playerData.id,
                    direction: direction
                }
            });
        }
    }

    stopStepSong('step1');
}

function handleSendMsg(event) {

    $messageField = $('[name="message_field"]');
    if (event.keyCode === keyEsc) {

        $messageField.val('').blur();
    }
    if (event.keyCode === keyEnter) {

        const msg = $messageField.val();

        if (msg === '') {

            return;
        }

        showMsg(playerData.id, msg);

        $messageField.val('').blur();

        sendEvent({
            type: 'MSG',
            data: {
                playerId: playerData.id,
                msg: msg
            }
        });
    }
}

async function handleLogoff() {

    addLoad();

    playMenuSong('menu2');

    try {
        await sendEvent({
            type: 'LEAVE',
            data: {
                name: playerData.name,
                skin: playerData.skin
            }
        });

        $(document).unbind('keydown keyup');

        goToLogin();
    }
    catch(error) {

        console.log('Falha ao sair do jogo: ' + error.message);
    }
    finally {
        removeLoad();
    }
}