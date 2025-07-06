import { gql } from "@apollo/client"

const GET_AIRPORTS = gql`
        query Airports($filter: AirportFilter) {
        airports(filter: $filter) {
            id
            name
            country
        }
    }
`

export default GET_AIRPORTS