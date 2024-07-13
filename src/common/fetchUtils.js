function fetchJson(url, request) {

    const promise = fetch(url, request);

    return promise.then( function(response) {

        return response.json();
    });
}