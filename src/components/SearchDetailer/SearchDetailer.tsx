import styles from "./SearchDetailer.module.css"
import FlightSearchRequest from "../../model/data/FlightSearchRequest.js"

export interface SearchDetailerProps {
    request: FlightSearchRequest
}

function SearchDetailer(props: SearchDetailerProps) {
    const { request } = props
    
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
            <p>
                From: {from}
            </p>
            <p>
                To: {to}
            </p>
        </div>
    )
}

export default SearchDetailer