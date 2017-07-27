import querystring from 'querystring';

interface getJSONCallback { (json): any; }

function getJSON(url: string, params, callback: getJSONCallback) {
    const fullUrl = isEmptyObject(params) ? url : url + '?' + querystring.stringify(params);

    fetch(fullUrl).then(
        (response) => { return response.json(); }
    ).then(callback);
}

function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0;
}

export {getJSON, isEmptyObject};
