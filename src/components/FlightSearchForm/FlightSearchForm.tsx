import { MultiSelect, TextInput } from "../Form/Form.js"
import { useState, useEffect } from "react"
import { useQuery, gql } from "@apollo/client"

import styles from "./FlightSearchForm.module.css"

function FlightSearchForm() {
    // useEffect(() => {
    //     useQuery(gql`
    //             query Airports($filter: AirportFilter, $orderBy: AirportOrderBy) {
    //                 id,
    //                 name,
    //                 country
    //             }
    //         `, {
    //             variables: {
    //                 filter: {

    //                 },
    //                 orderBy: {

    //                 }
    //             }
    //         })
    // }, [])

    return (
        <div className={styles.container}>
            <TextInput 
                placeholder="Enter something"
            />
            <MultiSelect 
                values={
                    [
                        "First", "Second", "Thirx"
                    ]
                }
            />
        </div>
    )
}

export default FlightSearchForm