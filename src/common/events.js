
function catchEvents(events) {

    for (let i = 0; i < events.length; i++) {

        catchEventEnter(events[i]);   
        catchEventMove(events[i]); 
        catchEventStopMove(events[i]);
        catchEventMsg(events[i]);
        catchEventLeave(events[i]);
    }
}

function catchEventEnter(event) {

    if (event.type !== 'ENTER') return;

    if (event.data.name === playerData.name) {

        playerData.id = event.data.id;
        playerData.name = event.data.name;
        playerData.skin = event.data.skin;
        playerData.position = event.data.position

        createPlayer(playerData.id, playerData.name, playerData.position);
        saveData();
        createSprite(playerData.id, playerData.skin);

        return;
    }

    // playerData.id = event.data.id;
    // playerData.name = event.data.name;
    // playerData.skin = event.data.skin;
    // playerData.position = event.data.position

    // saveData();
    
    createPlayer(event.data.id, event.data.name, event.data.position);
    const char = createSprite(event.data.id, event.data.skin);
    char.updateView();
}

function catchEventMove(event) {

    if (event.type !== 'MOVE') {

        return;
    }    

    if (event.data.playerId === playerData.id) {

        return;
    }

    moveChar(event.data.direction, event.data.playerId);
}

function catchEventStopMove(event) {

    if (event.type !== 'STOP_MOVE') {

        return;
    }    

    if (event.data.playerId === playerData.id) {

        return;
    }

    const sprite = mapDirectionToSprite(event.data.direction, false);
    const char = charMap[event.data.playerId];

    char.setView(sprite);
}

function catchEventMsg(event) {

    if (event.type !== 'MSG') {

        return;
    }    

    if (event.data.playerId === playerData.id) {

        return;
    }

    showMsg(event.data.playerId, event.data.msg);
}

function catchEventLeave(event) {

    if (event.type !== 'LEAVE') {

        return;
    } 

    if (playerData.id === event.data.playerId) {

        // playerData.id = null;

        // saveData();
    }

    $(`#${event.data.playerId}`).remove();
}