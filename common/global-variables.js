const speed = 3;
const keysPressed = [];
const keyLeft = 65;
const keyRight = 68;
const keyUp = 87;
const keyDown = 83;
const keyEnter = 13;
const keyEsc = 27;
const keys = [keyLeft, keyRight, keyUp, keyDown];
const urlServer = 'https://init-web-game.herokuapp.com'; //'http://localhost:5001';
const urlWsServer = 'wss://init-web-game.herokuapp.com';
let charMap = {};
let lastDate = new Date();
let lastEventId = 0;
let playerData = {
    id: null,
    name: null
};
let wsClient = null;