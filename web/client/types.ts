interface Station {
    id: string,
    name: string
}

interface JourneyResult {
    origin: Station,
    journeyTime: number
}

export {Station, JourneyResult}
