import AirportPicker from "../AirportPicker/AirportPicker.js"
import DatePicker from "../Form/DatePicker.js"
import GET_AIRPORTS from "../../data/queries/get_airports.js"
import { useSuspenseQuery } from "@apollo/client"
import AirportResponse from "../../model/responses/GetAirportsResponse.js"
import { useFlightSearchRequest } from "../../model/providers/FlightSearchProvider.js"

import styles from "./FlightSearchForm.module.css"

function FlightSearchForm() {

    const { data } = useSuspenseQuery(GET_AIRPORTS, {})
    const airportData = data as AirportResponse
    const {
        request,
        updateRequest
    } = useFlightSearchRequest()

    return (
        <div className={styles.container}>
            <div className={styles.airportSelectors}>
                <div className={styles.airportSelector}>
                    <h2>
                        From
                    </h2>
                    <AirportPicker
                        airports={airportData.airports}
                        onSelectCountry={country => {
                            updateRequest({
                                ...request,
                                startCountry: country ?? undefined
                            })
                        }}
                        onSelectedAirport={airport => {
                            updateRequest({
                                ...request,
                                startId: airport?.id
                            })
                        }} />
                </div>
                <div className={styles.airportSelector}>
                    <h2>
                        Destination
                    </h2>
                    <AirportPicker
                        airports={airportData.airports}
                        onSelectCountry={country => {
                            updateRequest({
                                ...request,
                                endCountry: country ?? undefined
                            })
                        }}
                        onSelectedAirport={airport => {
                            updateRequest({
                                ...request,
                                endId: airport?.id
                            })
                        }}
                    />
                </div>
            </div>
            <div className={styles.dateSelectors}>
                <div className={styles.dateSelector}>
                    <h2>
                        From
                    </h2>
                    <DatePicker onChange={date => {
                        updateRequest({
                            ...request,
                            dateAfterInclusive: date
                        })
                    }}/>
                </div>
                <div className={styles.dateSelector}>
                    <h2>
                        Up To
                    </h2>
                    <DatePicker onChange={date => {
                        updateRequest({
                            ...request,
                            dateBeforeInclusive: date
                        })
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FlightSearchForm