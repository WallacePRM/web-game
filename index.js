jQuery(() => {

    $(document).keydown(handleOnKeyDown);
    $(document).keyup(handleOnKeyUp);
    $('.action-msg input').keydown(handleSendMsg);
    $('.btn-char').on('click', startGame);

    createSkinSelect();

    loadData();
    loadPlayers();

    if (playerData.id !== null) {

        createPlayer(playerData.id, playerData.name, playerData.position);
        createSprite(playerData.id, playerData.skin);
    }

    wsConnect();
    setInterval(gameLooping, 1000 / 15);
});

function fetchJson(url, request) {

    const promise = fetch(url, request);

    return promise.then( function(response) {

        return response.json();
    });
}

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

    $char.append(`<span class="msg show">${msg}</span>`);
    setTimeout(function(){

        $char.find('.msg').removeClass('show');
        setTimeout(() => $char.find('.msg').remove(), 500);
    }, duration);
}

function moveChar(direction, charId) {

    const prop = direction === 'left' || direction === 'right' ? 'left' : 'top';
    const increase = direction === 'bottom' || direction === 'right';

    const $char =  $(`#${charId}`);

    let position = parseInt($char.css(prop));
    const worldHeigth = parseInt($('.world').css('height'));
    const worldWidth = parseInt($('.world').css('width'));
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

function wsConnect() {

    wsClient = new WebSocket(urlWsServer);

    wsClient.onopen = () => {

        $('.status').html('Conectado').css('color', 'green');
    };

    wsClient.onclose = () => {

        $('.status').html('Desconectado').css('color', 'red');

        setTimeout(() => {

            wsConnect();
        },3000);

    };

    wsClient.onmessage = (wsEvent) => {

        const event = JSON.parse(wsEvent.data);
        catchEvents([event]);
    };
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
        <div class="char" id="${id}" name="">
            <div class="info">
                <span>&lt; ${name} &gt;</span>
            </div>
            <div class="skin"></div>
        </div>
    `);

    if (position !== undefined) {

        playerHtml.css('top', `${position.top}px`);
        playerHtml.css('left', `${position.left}px`);
    }

    $('.world').append(playerHtml);
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

function startGame() {

    const charName = $('.game-init input').val();
    if (charName.trim() === '') {

        $('.game-init').addClass('invalid');
        return;
    }
    else {
        $('.game-init').removeClass('invalid');
    }

    playerData.name = charName;
    const skin = $('.skin').val();

    const promise = sendEvent({
        type: 'ENTER',
        data: {
            name: charName,
            skin: skin
        }
    });
}

function saveData() {

    const data = {
        playerData: playerData,
        lastEventId: lastEventId
    };

    localStorage.setItem('app-data', JSON.stringify(data));
}

function loadData() {

    const data = JSON.parse(localStorage.getItem('app-data'));

    if (data !== null) {

        playerData = data.playerData;
        lastEventId = data.lastEventId;
    }
}

function createSprite(playerId, skin) {

    const char = new SpriteCtrl($(`#${playerId} .skin`)[0], Sprite(skin));
    char.setView(`front`);

    charMap[playerId] = char;

    return char;
}

function getPlayers() {

    return fetchJson(urlServer + '/players');
}

function loadPlayers() {

    const promise = getPlayers();

    promise.then(function(players) {

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
    })
}

function createSkinSelect() {

    for (let i = 0; i < SpriteList.length; i++) {

        $('.skin').append(`<option>${SpriteList[i]}</option>`);
    }
}

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
}

function handleSendMsg(event) {

    if (event.keyCode === keyEsc) {

        $('.action-msg input').val('').blur();
    }
    if (event.keyCode === keyEnter) {

        const msg = $('.action-msg input').val();

        if (msg === '') {

            return;
        }

        showMsg(playerData.id, msg);

        $('.action-msg input').val('').blur();

        sendEvent({
            type: 'MSG',
            data: {
                playerId: playerData.id,
                msg: msg
            }
        });
    }
}