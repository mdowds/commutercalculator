import querystring from 'querystring';

interface getJSONCallback { (json): any; }

export function getJSON(url: string, params, callback: getJSONCallback) {
    const fullUrl = isEmptyObject(params) ? url : url + '?' + querystring.stringify(params);

    fetch(fullUrl).then(
        (response) => { return response.json(); }
    ).then(callback);
}

export function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0;
}
