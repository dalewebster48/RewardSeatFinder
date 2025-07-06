import { TextInput } from "../Form/Form.js"
import MultiSelect from "../Form/MultiSelect.js"
import GET_AIRPORTS from "../../data/queries/get_airports.js"
import { useSuspenseQuery } from "@apollo/client"
import { useState } from "react"

import styles from "./FlightSearchForm.module.css"

interface Airport {
    id: string
    name: string
    country: string
}

interface AirportResponse {
    airports: Airport[]
}

function FlightSearchForm() {
    const [selectedCountry, setSelectedCountry] = useState<string|null>()
    
    const { data } = useSuspenseQuery(GET_AIRPORTS, {
        variables: {
            filter: {
                
            }
        }
    })

    const airportData = data as AirportResponse
    const airportItems = airportData.airports.filter(airport => {
        return selectedCountry ? airport.country == selectedCountry : true
    }).map(airport => airport.name)

    // get the countries from the airports
    const countries = Array.from(new Set(airportData.airports.map(airport => airport.country)))

    return (
        <div className={styles.container}>
            <TextInput
                placeholder="Enter something"
            />
            <MultiSelect
                values={countries}
                onSelectedItemChange={index => {
                    if (index != null) {
                        setSelectedCountry(countries[index])
                    } else {
                        setSelectedCountry(null)
                    }
                }}
            />
            <MultiSelect
                values={airportItems}
                onSelectedItemChange={item => {
                    console.log("Selected item", item)
                }}
            />
        </div>
    )
}

export default FlightSearchForm