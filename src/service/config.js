let wsClient = null;
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const urlServer = isLocalhost ? 'http://localhost:5001' : 'https://web-game.fly.dev';
const urlWsServer = isLocalhost ? 'http://localhost:5001' : 'wss://web-game.fly.dev';