import SEARCH_FLIGHTS from "../../data/queries/search_flights.js"
import FlightSearchResponse from "../../model/responses/SearchFlightsResponse.js"
import styles from "./FlightSearchResultsBrowser.module.css"
import { useSuspenseQuery } from "@apollo/client"
import { useFlightSearchRequest } from "../../model/providers/FlightSearchProvider.js"
import { dateToPicker } from "../../helpers/Date.js"
import FlightCard from "../FlightCard/FlightCard.js"
import EmptySearchState from "./EmptySearchState.js"
import SearchDetailer from "../SearchDetailer/SearchDetailer.js"
import NoFlightsFound from "./NoFlightsFound.js"
import FlightResultsOrderBy from "../FlightResultsOrderBy/FlightResultsOrerBy.js"
import FlightOrder from "../../model/data/FlightsOrder.js"
import SortOrder from "../../model/data/SortOrder.js"

function FlightSearchResultsBrowser() {
    const {
        request,
        updateRequest
    } = useFlightSearchRequest()

    const missingAllLocale = (
        !request.startCountry &&
        !request.endCountry &&
        !request.startId &&
        !request.endId
    )

    const missingPointRanges = (
        !request.economyCostGte &&
        !request.economyCostLte &&
        !request.premiumCostGte &&
        !request.premiumCostLte &&
        !request.upperCostGte &&
        !request.upperCostLte
    )

    // if all search fields are empty then we don't wanna bother searching
    if (missingAllLocale && missingPointRanges) {
        return <div className={styles.results}>
            <div className={styles.header}>
                <h2>
                    Search for Flights
                </h2>
            </div>
            <EmptySearchState />
        </div>
    }

    const { data } = useSuspenseQuery(SEARCH_FLIGHTS, {
        variables: {
            filter: {
                startCountry: request.startCountry,
                startId: request.startId,
                endCountry: request.endCountry,
                endId: request.endId,
                dateAfterInclusive: request.dateAfterInclusive ?? dateToPicker(new Date()),
                dateBeforeInclusive: request.dateBeforeInclusive,
                economyDeal: request.economyDeal,
                premiumDeal: request.premiumDeal,
                upperDeal: request.upperDeal,
                economyCostGte: request.economyCostGte,
                economyCostLte: request.economyCostLte,
                premiumCostGte: request.premiumCostGte,
                premiumCostLte: request.premiumCostLte,
                upperCostGte: request.upperCostGte,
                upperCostLte: request.upperCostLte
            },
            orderBy: {
                [request.flightCriteria ?? FlightOrder.DATE]: request.flightOrder ?? SortOrder.Ascending
            }
        }
    })

    const response = data as FlightSearchResponse

    // Check if we have zero results
    if (response.flights.length === 0) {
        return <div className={styles.results}>
            <div className={styles.header}>
                <h2>
                    Results
                </h2>
            </div>
            <SearchDetailer request={request} resultsCount={0} />
            <NoFlightsFound />
        </div>
    }

    const resultsItems = response.flights.map(flight => {
        return <li key={flight.id}>
            <FlightCard flight={flight} />
        </li>
    })

    return <div className={styles.results}>
        <div className={styles.header}>
            <h2>
                Results
            </h2>
        </div>
        <SearchDetailer request={request} resultsCount={response.flights.length} />
        <FlightResultsOrderBy orderChanged={(criteria, order) => {
            updateRequest({
                ...request,
                flightCriteria: criteria ?? undefined,
                flightOrder: order
            })
        }} />
        <div className={styles.resultsList}>
            <ul>
                {resultsItems}
            </ul>
        </div>
    </div>
}

export default FlightSearchResultsBrowser