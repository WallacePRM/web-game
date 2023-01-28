const speed = 3;
const keysPressed = [];
const keyLeft = 65;
const keyRight = 68;
const keyUp = 87;
const keyDown = 83;
const keyEnter = 13;
const keyEsc = 27;
const keys = [keyLeft, keyRight, keyUp, keyDown];
const urlServer = 'https://web-game.fly.dev'; //'http://localhost:5001';
const urlWsServer = 'wss://web-game.fly.dev';
let charMap = {};
let lastDate = new Date();
let lastEventId = 0;
let playerData = {
    id: null,
    name: null
};
let wsClient = null;