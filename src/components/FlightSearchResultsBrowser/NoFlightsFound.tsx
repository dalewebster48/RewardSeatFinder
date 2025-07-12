import styles from "./NoFlightsFound.module.css"

function NoFlightsFound() {
    return (
        <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
                😔
            </div>
            <h3 className={styles.noResultsTitle}>
                No flights found
            </h3>
            <p className={styles.noResultsMessage}>
                We couldn't find any flights matching your search criteria. Try adjusting your filters or search parameters.
            </p>
            <div className={styles.suggestions}>
                <h4 className={styles.suggestionsTitle}>Try these suggestions:</h4>
                <ul className={styles.suggestionsList}>
                    <li>Expand your date range</li>
                    <li>Remove some filters or deals requirements</li>
                    <li>Try different departure or destination airports</li>
                    <li>Check if you've set realistic point ranges</li>
                </ul>
            </div>
        </div>
    )
}

export default NoFlightsFound
