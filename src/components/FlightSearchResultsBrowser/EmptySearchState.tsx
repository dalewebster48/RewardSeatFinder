import styles from "./EmptySearchState.module.css"

function EmptySearchState() {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
                ✈️
            </div>
            <h3 className={styles.emptyStateTitle}>
                Ready to find your next adventure?
            </h3>
            <p className={styles.emptyStateMessage}>
                Please select your departure and destination locations to start searching for amazing flight deals.
            </p>
            <div className={styles.emptyStateSteps}>
                <div className={styles.step}>
                    <span className={styles.stepNumber}>1</span>
                    <span>Choose your departure location</span>
                </div>
                <div className={styles.step}>
                    <span className={styles.stepNumber}>2</span>
                    <span>Select your destination</span>
                </div>
                <div className={styles.step}>
                    <span className={styles.stepNumber}>3</span>
                    <span>Set your travel dates and preferences</span>
                </div>
            </div>
        </div>
    )
}

export default EmptySearchState
