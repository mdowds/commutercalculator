export interface Station {
    id: string,
    name: string,
    position: Position
}

export interface JourneyResult {
    origin: Station,
    journeyTime: number
}

export interface SelectedFilters {
    minTime?: number,
    maxTime?: number
}

export interface Position {
    lat: number,
    lng: number
}

