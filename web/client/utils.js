function getJSON(url, callback) {
    window.fetch(url).then(
        (response) => { return response.json(); }
    ).then(callback);
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export {getJSON, isEmptyObject};
