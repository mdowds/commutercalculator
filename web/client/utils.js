function getJSON(url, callback) {
    window.fetch(url).then(
        (response) => { return response.json(); }
    ).then(callback);
}

export {getJSON};
