import { gql } from "@apollo/client"

const SEARCH_FLIGHTS = gql`
    query Flights($filter: FlightFilter) {
      flights(filter: $filter) {
        id,
        date,
        economy_cost
        premium_cost
        upper_cost
        start {
          name
        }
        end {
          name
        }
      }
    }
`

export default SEARCH_FLIGHTS