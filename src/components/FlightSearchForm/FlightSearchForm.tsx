import AirportPicker from "../AirportPicker/AirportPicker.js"
import DatePicker from "../Form/DatePicker.js"
import Checkbox from "../Form/Checkbox.js"
import GET_AIRPORTS from "../../data/queries/get_airports.js"
import { useSuspenseQuery } from "@apollo/client"
import AirportResponse from "../../model/responses/GetAirportsResponse.js"
import { useFlightSearchRequest } from "../../model/providers/FlightSearchProvider.js"
import { NumberInput } from "../Form/Form.js"

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
            <div className={styles.dealPickers}>
                <h2>
                    Deals
                </h2>
                <Checkbox label="Only include economy deals"  onChange={checked => {
                    updateRequest({
                        ...request,
                        economyDeal: checked ? true : undefined
                    })
                }}/>
                <Checkbox label="Only include premium deals"  onChange={checked => {
                    updateRequest({
                        ...request,
                        premiumDeal: checked ? true : undefined
                    })
                }}/>
                <Checkbox label="Only include upper class deals"  onChange={checked => {
                    updateRequest({
                        ...request,
                        upperDeal: checked ? true : undefined
                    })
                }}/>
            </div>
            <div className={styles.pointsFilters}>
                <div className={styles.pointFilter}>
                    <h3>
                        Economy
                    </h3>
                    <NumberInput label="Minimum"  onChange={value => {
                        updateRequest({
                            ...request,
                            economyCostGte: value
                        })
                    }}/>
                    <NumberInput label="Maximum"  onChange={value => {
                        updateRequest({
                            ...request,
                            economyCostLte: value
                        })
                    }}/>
                </div>
                <div className={styles.pointFilter}>
                    <h3>
                        Premium
                    </h3>
                    <NumberInput label="Minimum"  onChange={value => {
                        updateRequest({
                            ...request,
                            premiumCostGte: value
                        })
                    }}/>
                    <NumberInput label="Maximum"  onChange={value => {
                        updateRequest({
                            ...request,
                            premiumCostLte: value
                        })
                    }}/>
                </div>
                <div className={styles.pointFilter}>
                    <h3>
                        Upper Class
                    </h3>
                    <NumberInput label="Minimum"  onChange={value => {
                        updateRequest({
                            ...request,
                            upperCostGte: value
                        })
                    }}/>
                    <NumberInput label="Maximum"  onChange={value => {
                        updateRequest({
                            ...request,
                            upperCostLte: value
                        })
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FlightSearchForm