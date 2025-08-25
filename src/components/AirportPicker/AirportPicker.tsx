import ToggleButtonGroup from "../Form/ToggleButtonGroup.js"
import { useState } from "react"
import Airport from "../../model/data/Airport.js"
import styles from "./AirportPicker.module.css"

export interface AirportPickerProps {
    airports: Airport[]
    onSelectCountry(country: string | null): any
    onSelectedAirport(airport: Airport | null): any
}

function AirportPicker(props: AirportPickerProps) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null)

    const countryAirports = props.airports.filter(airport => {
        return selectedCountry ? airport.country === selectedCountry : false
    })

    // get the countries from the airports
    const countries = Array.from(new Set(props.airports.map(airport => airport.country)))

    // Calculate which airport is selected from the current filtered list
    const selectedAirportIndex = selectedAirport ? 
        countryAirports.findIndex(airport => airport.id === selectedAirport.id) : -1

    return (
        <div className={styles.pickers}>
            <div className={styles.section}>
                <label className={styles.label}>Select Country:</label>
                <ToggleButtonGroup
                    values={countries}
                    multiSelect={false}
                    onSelectedItemsChange={indices => {
                        if (indices.length > 0) {
                            const selectedCountryName = countries[indices[0]]
                            setSelectedCountry(selectedCountryName)
                            props.onSelectCountry(selectedCountryName)
                            
                            // Clear airport selection when country changes
                            setSelectedAirport(null)
                            props.onSelectedAirport(null)
                        } else {
                            setSelectedCountry(null)
                            props.onSelectCountry(null)
                            setSelectedAirport(null)
                            props.onSelectedAirport(null)
                        }
                    }}
                />
            </div>
            
            <div className={styles.section}>
                <label className={styles.label}>Select Airport:</label>
                <ToggleButtonGroup
                    values={selectedCountry ? countryAirports.map(airport => airport.name) : undefined}
                    multiSelect={false}
                    disabled={!selectedCountry}
                    placeholder="Select a country first to see airports"
                    selectedIndices={selectedAirportIndex >= 0 ? [selectedAirportIndex] : []}
                    onSelectedItemsChange={indices => {
                        if (indices.length > 0) {
                            const newSelectedAirport = countryAirports[indices[0]]
                            setSelectedAirport(newSelectedAirport)
                            props.onSelectedAirport(newSelectedAirport)
                        } else {
                            setSelectedAirport(null)
                            props.onSelectedAirport(null)
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default AirportPicker