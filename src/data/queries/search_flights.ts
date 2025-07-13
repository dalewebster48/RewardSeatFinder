import { gql } from "@apollo/client"

const SEARCH_FLIGHTS = gql`
    query Flights($filter: FlightFilter, $orderBy: FlightOrderBy, $limit: Int) {
      flights(filter: $filter, orderBy: $orderBy, limit: $limit) {
        id,
        date,

        economy_cost
        premium_cost
        upper_cost

        economy_deal
        premium_deal
        upper_deal

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