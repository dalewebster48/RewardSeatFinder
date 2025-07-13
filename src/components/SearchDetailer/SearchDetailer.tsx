import styles from "./SearchDetailer.module.css"
import FlightSearchRequest from "../../model/data/FlightSearchRequest.js"

export interface SearchDetailerProps {
    request: FlightSearchRequest
    resultsCount?: number
}

function SearchDetailer(props: SearchDetailerProps) {
    const { request, resultsCount } = props
    
    const {
        startCountry,
        endCountry,
        startId,
        endId
    } = request

    const from = startId ? startId : startCountry ?? "Anywhere"
    const to = endId ? endId : endCountry ?? "Anywhere"

    return (
        <div className={styles.search}>
            <div className={styles.searchInfo}>
                <p>
                    From: {from}
                </p>
                <p>
                    To: {to}
                </p>
            </div>
            {resultsCount !== undefined && (
                <div className={styles.resultsCount}>
                    <p>
                        Showing {resultsCount} flight{resultsCount !== 1 ? 's' : ''}
                    </p>
                </div>
            )}
        </div>
    )
}

export default SearchDetailer