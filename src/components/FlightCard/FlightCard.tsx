import styles from "./FlightCard.module.css"
import Flight from "../../model/data/Flight.js"
import { cs_if } from "../../helpers/Styles.js"

interface FlightCardProps {
    flight: Flight
}

function FlightCard(props: FlightCardProps) {
    const { flight } = props

    const economyCost = flight.economy_cost ? `${flight.economy_cost} points` : "N/A"
    const premiumCost = flight.premium_cost ? `${flight.premium_cost} points` : "N/A"
    const upperCost = flight.upper_cost ? `${flight.upper_cost} points` : "N/A"

    return (
        <div className={styles.flightCard}>
            <div className={styles.header}>
                <span>
                    { flight.start.name } - { flight.end.name }
                </span>
            </div>
            <div className={styles.info}>
                <div className={styles.date}>
                    { flight.date }
                </div>
            </div>
            <div className={styles.points}>
                <div className={cs_if(styles.deal, flight.economy_deal) ?? ""}>
                    Economy - { economyCost }
                </div>
                <div className={cs_if(styles.deal, flight.premium_deal) ?? ""}>
                    Premium - { premiumCost }
                </div>
                <div className={cs_if(styles.deal, flight.upper_deal) ?? ""}>
                    Upper Class - { upperCost }
                </div>
            </div>
        </div>
    )
}

export default FlightCard