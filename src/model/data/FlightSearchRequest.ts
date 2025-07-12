interface FlightSearchRequest {
    startCountry?: string
    endCountry?: string
    startId?: string
    endId?: string

    dateAfterInclusive?: string
    dateBeforeInclusive?: string

    economyDeal?: boolean
    premiumDeal?: boolean
    upperDeal?: boolean

    economyCostGte?: number
    economyCostLte?: number

    premiumCostGte?: number
    premiumCostLte?: number

    upperCostGte?: number
    upperCostLte?: number
}

export default FlightSearchRequest