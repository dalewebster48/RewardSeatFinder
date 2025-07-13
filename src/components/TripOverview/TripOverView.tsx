import styles from "./TripOverview.module.css"
import { useActiveTrip } from "../../model/providers/ActiveTripProvider.js"
import TripOverviewCard from "../TripOverviewCard/TripOverviewCard.js"

function TripOverview() {
    const {
        trip
    } = useActiveTrip()

    if (! trip) return <></>

    const flights = trip.flights
    const flightItems = flights.map(flight => {
        return (
            <li>
                <TripOverviewCard key={flight.flight.id} tripFlight={flight}/>
            </li>
        )
    })

    return (
        <div className={styles.overview}>
            <h3>
                Your Trip
            </h3>
            <ul>
                {flightItems}
            </ul>
        </div>
    )
}

export default TripOverview