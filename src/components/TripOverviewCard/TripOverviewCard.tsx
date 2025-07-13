import styles from "./TripOverviewCard.module.css"
import TripFlight from "../../model/data/TripFlight.js"
import FlightTier from "../../model/data/FlightTier.js"

interface TripOverviewCardProps {
    tripFlight: TripFlight
}

function TripOverviewCard(props: TripOverviewCardProps) {
    const {
        tripFlight
    } = props

    // Get the cost based on selected tier
    const getCost = () => {
        switch (tripFlight.selectedTier) {
            case FlightTier.ECONOMY:
                return tripFlight.flight.economy_cost
            case FlightTier.PREMIUM:
                return tripFlight.flight.premium_cost
            case FlightTier.UPPER:
                return tripFlight.flight.upper_cost
            default:
                return null
        }
    }

    // Get the tier name for display
    const getTierName = () => {
        switch (tripFlight.selectedTier) {
            case FlightTier.ECONOMY:
                return "Economy"
            case FlightTier.PREMIUM:
                return "Premium"
            case FlightTier.UPPER:
                return "Upper Class"
            default:
                return ""
        }
    }

    // Get the CSS class for the tier
    const getTierClass = () => {
        switch (tripFlight.selectedTier) {
            case FlightTier.ECONOMY:
                return styles.economyHeader
            case FlightTier.PREMIUM:
                return styles.premiumHeader
            case FlightTier.UPPER:
                return styles.upperHeader
            default:
                return ""
        }
    }

    const cost = getCost()

    return (
        <div className={styles.card}>
            <div className={`${styles.header} ${getTierClass()}`}>
                { tripFlight.flight.start.id } - { tripFlight.flight.end.id }
            </div>
            <div className={styles.details}>
                <div className={styles.date}>{ tripFlight.flight.date }</div>
                <div className={styles.tier}>
                    {getTierName()} - {cost ? `${cost} points` : "N/A"}
                </div>
            </div>
        </div>
    )
}

export default TripOverviewCard