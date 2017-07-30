export interface Station {
    readonly id: string,
    readonly name: string,
    readonly position: Position
}

export interface JourneyResult {
    readonly origin: Station,
    readonly journeyTime: number,
    readonly seasonTicket: SeasonTicket
}

export interface SeasonTicket {
    readonly price?: number
}

export interface SelectedFilters {
    minTime?: number,
    maxTime?: number
}

export interface Position {
    readonly lat: number,
    readonly lng: number
}
