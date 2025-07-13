import styles from "./FlightCard.module.css"
import Flight from "../../model/data/Flight.js"
import TripFlight from "../../model/data/TripFlight.js"
import { cs_if } from "../../helpers/Styles.js"
import { useActiveTrip } from "../../model/providers/ActiveTripProvider.js"
import { useFlightSearchRequest } from "../../model/providers/FlightSearchProvider.js"
import FlightTier from "../../model/data/FlightTier.js"

interface FlightCardProps {
    flight: Flight
}

function FlightCard(props: FlightCardProps) {
    const { flight } = props

    const economyCost = flight.economy_cost ? `${flight.economy_cost} points` : "N/A"
    const premiumCost = flight.premium_cost ? `${flight.premium_cost} points` : "N/A"
    const upperCost = flight.upper_cost ? `${flight.upper_cost} points` : "N/A"

    const {
        trip,
        updateTrip
    } = useActiveTrip()

    const {
        updateRequest
    } = useFlightSearchRequest()

    const addFlightToTrip = (
        tripFlight: TripFlight
    ) => {
        // this will either add the new flight to the existing flights
        // or create a new flight
        updateTrip({
            flights: [
                ...trip?.flights ?? [],
                tripFlight
            ]
        })
    }

    const startConnectingRequest = (flight: Flight) => {
        updateRequest({
            startId: flight.end.id,
            endId: flight.start.id,
            dateAfterInclusive: flight.date
        })
    }

    return (
        <div className={styles.flightCard}>
            <div className={styles.header}>
                <span>
                    {flight.start.name} - {flight.end.name}
                </span>
            </div>
            <div className={styles.info}>
                <div className={styles.date}>
                    {flight.date}
                </div>
            </div>
            <div className={styles.points}>
                <div className={cs_if(styles.deal, flight.economy_deal) ?? ""}>
                    <span className={styles.classInfo}>Economy - {economyCost}</span>
                    {flight.economy_cost && (
                        <button 
                            className={styles.classButton}
                            onClick={() => {
                                addFlightToTrip({
                                    flight: flight,
                                    selectedTier: FlightTier.ECONOMY
                                })
                                startConnectingRequest(flight)
                            }}
                        >
                            {trip ? "Add Economy" : "Create Trip"}
                        </button>
                    )}
                </div>
                <div className={cs_if(styles.deal, flight.premium_deal) ?? ""}>
                    <span className={styles.classInfo}>Premium - {premiumCost}</span>
                    {flight.premium_cost && (
                        <button 
                            className={styles.classButton}
                            onClick={() => {
                                addFlightToTrip({
                                    flight: flight,
                                    selectedTier: FlightTier.PREMIUM
                                })
                                startConnectingRequest(flight)
                            }}
                        >
                            {trip ? "Add Premium" : "Create Trip"}
                        </button>
                    )}
                </div>
                <div className={cs_if(styles.deal, flight.upper_deal) ?? ""}>
                    <span className={styles.classInfo}>Upper Class - {upperCost}</span>
                    {flight.upper_cost && (
                        <button 
                            className={styles.classButton}
                            onClick={() => {
                                addFlightToTrip({
                                    flight: flight,
                                    selectedTier: FlightTier.UPPER
                                })
                                startConnectingRequest(flight)
                            }}
                        >
                            {trip ? "Add Upper" : "Create Trip"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FlightCard