import {getJSON} from "./utils";
import Config from "./config";
import {JourneyResult, SelectedFilters, Station} from "./types";

// Get destinations

interface getDestinationsCallback {
    (destinations: Array<Station>): any;
}

export function getDestinations(callback: getDestinationsCallback) {
    getJSON(Config.apiUrl + "destinations", {}, (json) => {
        callback(<Array<Station>>json);
    });
}


// Get journeys

interface getJourneysResponse {
    destination: Station,
    results: Array<JourneyResult>
}

interface getJourneysCallback {
    (destination: Station, results: Array<JourneyResult>): any;
}

export function getJourneys(originId: string, selectedFilters: SelectedFilters, callback: getJourneysCallback) {

    let params: any = {};
    if(selectedFilters.minTime) params.min_time = selectedFilters.minTime;
    if(selectedFilters.maxTime) params.max_time = selectedFilters.maxTime;

    getJSON(Config.apiUrl + 'journeys/to/' + originId, params, (json) => {
        const response = <getJourneysResponse>json;
        callback(response.destination, response.results);
    });
}