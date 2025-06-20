function catchEvents(events) {
  for (const event of events) {
    triggerEvent(event);
  }
}

function triggerEvent(event) {
  switch (event.type) {
    case "ENTER":
      catchEventEnter(event);
      break;
    case "MOVE":
      catchEventMove(event);
      break;
    case "STOP_MOVE":
      catchEventStopMove(event);
      break;
    case "MSG":
      catchEventMsg(event);
      break;
    case "LEAVE":
      catchEventLeave(event);
      break;
  }
}

function catchEventEnter(event) {

  playerData = event.data;
  saveData();
  createPlayer(event.data);
}

function catchEventMove(event) {

  if (event.data.playerId === playerData.id)
		return;

  moveChar(event.data.direction, event.data.playerId);
}

function catchEventStopMove(event) {

  if (event.data.playerId === playerData.id)
		return;

  const sprite = mapDirectionToSprite(event.data.direction, false);
  const char = charMap[event.data.playerId];
  char.setView(sprite);
}

function catchEventMsg(event) {

  if (event.data.playerId === playerData.id)
		return;

  showMsg(event.data.playerId, event.data.msg);
}

function catchEventLeave(event) {

  $(`#${event.data.playerId}`).remove();
}
