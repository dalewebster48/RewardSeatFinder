import MultiSelect from "../Form/MultiSelect.js"
import { useState } from "react"
import Airport from "../../model/data/Airport.js"
import styles from "./AirportPicker.module.css"
import { cs } from "../../helpers/Styles.js"

export interface AirportPickerProps {
    airports: Airport[]
    onSelectCountry(country: string | null): any
    onSelectedAirport(airport: Airport | null): any
}

function AirportPicker(props: AirportPickerProps) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>()

    const airports = props.airports.filter(airport => {
        return selectedCountry ? airport.country == selectedCountry : true
    })

    // get the countries from the airports
    const countries = Array.from(new Set(props.airports.map(airport => airport.country)))

    return (
        <div className={styles.pickers}>
            <div className={cs([
                styles.picker,
                styles.small
            ])}>
                <MultiSelect
                    values={countries}
                    onSelectedItemChange={index => {
                        if (index != null) {
                            setSelectedCountry(countries[index])
                            props.onSelectCountry(countries[index])
                        } else {
                            setSelectedCountry(null)
                            props.onSelectCountry(null)
                        }
                    }}
                />
            </div>
            <div className={styles.picker}>
                <MultiSelect
                    values={airports.map(airports => airports.name)}
                    onSelectedItemChange={index => {
                        if (index != null) {
                            props.onSelectedAirport(airports[index])
                        } else {
                            props.onSelectedAirport(null)
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default AirportPicker