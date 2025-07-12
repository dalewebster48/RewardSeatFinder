import SEARCH_FLIGHTS from "../../data/queries/search_flights.js"
import FlightSearchResponse from "../../model/responses/SearchFlightsResponse.js"
import styles from "./FlightSearchResultsBrowser.module.css"
import { useSuspenseQuery } from "@apollo/client"
import { useFlightSearchRequest } from "../../model/providers/FlightSearchProvider.js"
import { dateToPicker } from "../../helpers/Date.js"

function FlightSearchResultsBrowser() {
    const {
        request
    } = useFlightSearchRequest()

    // if all search fields are empty then we don't wanna bother searching
    if (
        !request.startCountry &&
        !request.endCountry &&
        !request.startId &&
        !request.endId
    ) {
        return <p>
            Be more specific
        </p>
    }

    const { data } = useSuspenseQuery(SEARCH_FLIGHTS, {
        variables: {
            filter: {
                startCountry: request.startCountry,
                startId: request.startId,
                endCountry: request.endCountry,
                endId: request.endId,
                dateAfterInclusive: request.dateAfterInclusive ?? dateToPicker(new Date()),
                dateBeforeInclusive: request.dateBeforeInclusive
            },
            limit: 20
        }
    })

    const response = data as FlightSearchResponse

    const resultsItems = response.flights.map(flight => {
        return <li key={flight.id}>
            <p>
                From: {flight.start.name}
            </p>
            <p>
                To: {flight.end.name}
            </p>
            <p>
                Date: {flight.date}
            </p>
            <p>
                Economy: {flight.economy_cost}
            </p>
            <p>
                Premium: {flight.premium_cosnt}
            </p>
            <p>
                Upper Class: {flight.upper_cost}
            </p>
        </li>
    })

    return <div className={styles.results}>
        <div className={styles.header}>
            <h2>
                Results
            </h2>
        </div>
        <div className={styles.search}>
            <p>
                From: {request.startCountry} - {request.startId}
            </p>
            <p>
                To: {request.endCountry} - {request.endId}
            </p>
        </div>
        <div className={styles.resultsList}>
            <ul>
                {resultsItems}
            </ul>
        </div>
    </div>
}

export default FlightSearchResultsBrowser