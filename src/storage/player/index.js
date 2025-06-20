let charMap = {};
let lastDate = new Date();
let lastEventId = 0;
let playerData = {
	id: null,
	name: null
};

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
