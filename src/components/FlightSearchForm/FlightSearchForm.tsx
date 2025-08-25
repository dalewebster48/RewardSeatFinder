import AirportPicker from "../AirportPicker/AirportPicker.js"
import DatePicker from "../Form/DatePicker.js"
import Checkbox from "../Form/Checkbox.js"
import GET_AIRPORTS from "../../data/queries/get_airports.js"
import { useSuspenseQuery } from "@apollo/client"
import AirportResponse from "../../model/responses/GetAirportsResponse.js"
import { useFlightSearchRequest } from "../../model/providers/FlightSearchProvider.js"
import { NumberInput } from "../Form/Form.js"
import { useState, useCallback, useEffect, useRef } from "react"
import Airport from "../../model/data/Airport.js"

import styles from "./FlightSearchForm.module.css"

function FlightSearchForm() {
    const { data } = useSuspenseQuery(GET_AIRPORTS, {})
    const airportData = data as AirportResponse
    const {
        request,
        updateRequest
    } = useFlightSearchRequest()

    // Local state for batching updates
    const [startCountry, setStartCountry] = useState<string | null>(null)
    const [startAirport, setStartAirport] = useState<Airport | null>(null)
    const [endCountry, setEndCountry] = useState<string | null>(null)
    const [endAirport, setEndAirport] = useState<Airport | null>(null)

    // Debounce timer ref
    const debounceTimerRef = useRef<number | null>(null)

    // Debounced update function
    const debouncedUpdateRequest = useCallback(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }
        
        debounceTimerRef.current = setTimeout(() => {
            updateRequest({
                ...request,
                startCountry: startCountry ?? undefined,
                startId: startAirport?.id,
                endCountry: endCountry ?? undefined,
                endId: endAirport?.id
            })
        }, 300) // 300ms debounce delay
    }, [request, startCountry, startAirport, endCountry, endAirport, updateRequest])

    // Trigger debounced update when location state changes
    useEffect(() => {
        debouncedUpdateRequest()
    }, [startCountry, startAirport, endCountry, endAirport, debouncedUpdateRequest])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.clearSection}>
                <button 
                    type="button" 
                    className={styles.clearButton}
                    onClick={() => {
                        updateRequest({})
                    }}
                >
                    🗑️ Clear All Filters
                </button>
            </div>
            <div className={styles.airportSelectors}>
                <div className={styles.airportSelector}>
                    <h2>
                        From
                    </h2>
                    <AirportPicker
                        airports={airportData.airports}
                        onSelectCountry={country => {
                            setStartCountry(country)
                            debouncedUpdateRequest()
                        }}
                        onSelectedAirport={airport => {
                            setStartAirport(airport)
                            debouncedUpdateRequest()
                        }} />
                </div>
                <div className={styles.airportSelector}>
                    <h2>
                        Destination
                    </h2>
                    <AirportPicker
                        airports={airportData.airports}
                        onSelectCountry={country => {
                            setEndCountry(country)
                            debouncedUpdateRequest()
                        }}
                        onSelectedAirport={airport => {
                            setEndAirport(airport)
                            debouncedUpdateRequest()
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
                    <div className={styles.minMaxRow}>
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
                </div>
                <div className={styles.pointFilter}>
                    <h3>
                        Premium
                    </h3>
                    <div className={styles.minMaxRow}>
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
                </div>
                <div className={styles.pointFilter}>
                    <h3>
                        Upper Class
                    </h3>
                    <div className={styles.minMaxRow}>
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
        </div>
    )
}

export default FlightSearchForm