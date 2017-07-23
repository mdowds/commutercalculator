import querystring from 'querystring';

function getJSON(url, params, callback) {
    const fullUrl = isEmptyObject(params) ? url : url + '?' + querystring.stringify(params);

    fetch(fullUrl).then(
        (response) => { return response.json(); }
    ).then(callback);
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export {getJSON, isEmptyObject};
