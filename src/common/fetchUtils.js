async function fetchJson(url, request) {

	const response = await fetch(url, request);

	return response.json();
}

function ErrorMessage(message, codigo) {

	return new Error(message, {
		cause: codigo ?? EventStatus.error
	})
}

class FetchController {

}