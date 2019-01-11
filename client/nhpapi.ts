import {getJSON} from "./utils";

interface getPricesCallback {
    (averagePrice: number): any;
}

const apiUrl = "https://mdowds.com/nearbyhouseprices/api/";

export function getPrices(outcode: string, callback: getPricesCallback) {
    getJSON(apiUrl + "prices/outcode/" + outcode, {}, (json) => {
        callback(<number>json.averagePrice);
    });
}