const EventStatus = {
  ok: 200,
  error: 404
};
const EventType = {
  enter: "ENTER",
  move: "MOVE",
  stopMove: "STOP_MOVE",
  msg: "MSG",
  leave: "LEAVE",
  inactivity: "INACTIVITY"
};
const pendingResponses = {};

function generateEventId() {
  return Math.random().toString(36).substring(2, 9);
}

function catchResponse(event) {
  return {
    status: event.status,
    message: event.data.message ?? undefined
  };
}

function sendEvent(event) {
  return new Promise((resolve, reject) => {
    if (wsClient.readyState !== WebSocket.OPEN)
      return reject(ErrorMessage('Servidor fora do ar'));

    const eventId = generateEventId();
    event.id = eventId;
    pendingResponses[eventId] = resolve;

    wsClient.send(JSON.stringify(event));
    setTimeout(() => {
      if (pendingResponses[eventId]) {
        delete pendingResponses[eventId];
        reject(ErrorMessage('Falha ao conectar-se ao servidor, tente novamente mais tarde ou entre no mundo novamente', 403));
      }
    }, 10000);
  });
}

function catchEvents(events) {
  for (const event of events) {
    triggerEvent(event);
  }
}

function triggerEvent(event) {

  if (event.data.playerId === playerData.id && (event.type !== EventType.leave && event.type !== EventType.inactivity)) {
    return;
  }

  switch (event.type) {
    case EventType.enter:
      catchEventEnter(event);
      break;
    case EventType.move:
      catchEventMove(event);
      break;
    case EventType.stopMove:
      catchEventStopMove(event);
      break;
    case EventType.msg:
      catchEventMsg(event);
      break;
    case EventType.leave:
      catchEventLeave(event);
      break;
    case EventType.inactivity:
      catchEventInactivity(event);
      break;
  }
}

function catchEventEnter(event) {

  if (!playerData.id)
    saveData(event.data);

  createPlayer(event.data);
}

function catchEventMove(event) {

  moveChar(event.data.direction, event.data.playerId);
}

function catchEventStopMove(event) {

  const sprite = mapDirectionToSprite(event.data.direction, false);
  const char = charMap[event.data.playerId];
  if (char)
    char.setView(sprite);
}

function catchEventMsg(event) {

  showMsg(event.data.playerId, event.data.msg);
}

function catchEventLeave(event) {

  if (event.data.playerId !== playerData.id) {
    $(`[id="${event.data.playerId}"]`).fadeOut();
    setTimeout(() => $(`[id="${event.data.playerId}"]`).remove(), 1000);
    return;
  }

  console.log({event});
  if (!event.id)
    goToLogin();
}

let leaveTimeoutId;
function catchEventInactivity(event) {

  if (event.data.playerId !== playerData.id)
    return;

  if (leaveTimeoutId)
    return;

  const stopLeaving = async () => {

    clearTimeout(leaveTimeoutId);

    await sendEvent({
      type: EventType.inactivity,
      data: {
        playerId: playerData.id,
        time: new Date()
      }
    });

    setTimeout(() => leaveTimeoutId = null, 1000);
  };

  const countDownTime = 10000;
  ToastContainer.error('Desconectando por inativdade prolongada...', countDownTime, stopLeaving);
  leaveTimeoutId = setTimeout(async () => {

    const result = await sendEvent({
      type: EventType.leave,
      data: {
        playerId: playerData.id
      }
    });

    if (result.status === EventStatus.ok) {
      leaveTimeoutId = null;
      goToLogin();
    }
  }, countDownTime);

}
class EventsController {


}