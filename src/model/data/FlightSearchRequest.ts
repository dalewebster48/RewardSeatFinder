interface FlightSearchRequest {
    startCountry?: string
    endCountry?: string
    startId?: string
    endId?: string

    dateAfterInclusive?: string
    dateBeforeInclusive?: string
}

export default FlightSearchRequest