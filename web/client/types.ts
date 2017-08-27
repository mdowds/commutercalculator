export interface Station {
    readonly id: string;
    readonly name: string;
    readonly postcode: string;
    readonly position: Position;
}

export interface JourneyResult {
    readonly origin: Station;
    readonly journeyTime: number;
    readonly directionsUrl: string;
    readonly seasonTickets: SeasonTickets;
}

export interface SeasonTickets {
    readonly travelcard?: Travelcard;
    readonly seasonTicket?: SeasonTicket
}

export interface Travelcard {
    readonly minZone: number;
    readonly maxZone: number;
    readonly price: number;
}

export interface SeasonTicket {
    readonly price: number;
}

export interface SelectedFilters {
    minTime?: number;
    maxTime?: number;
}

export interface Position {
    readonly lat: number;
    readonly lng: number;
}
