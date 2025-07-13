import FlightSearchForm from "../FlightSearchForm/FlightSearchForm.js"
import FlightSearchResultsBrowser from "../FlightSearchResultsBrowser/FlightSearchResultsBrowser.js"
import TripOverview from "../TripOverview/TripOverView.js"
import { ActiveTripProvider } from "../../model/providers/ActiveTripProvider.js"
import styles from "./App.module.css"
import { FlightSearchRequestProvider } from "../../model/providers/FlightSearchProvider.js"
import { Suspense } from "react"

export default function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1 className={styles.title}>✈️ Flight Rewards Finder</h1>
            </header>
            <main className={styles.main}>
                <ActiveTripProvider>
                    <FlightSearchRequestProvider>
                        <TripOverview />
                        <div className={styles.searchContainer}>
                            <div className={styles.searchForm}>
                                <Suspense fallback={
                                    <div className={styles.loading}>
                                        <div className={styles.spinner}></div>
                                        <p>Loading search form...</p>
                                    </div>
                                }>
                                    <FlightSearchForm />
                                </Suspense>
                            </div>
                            <div className={styles.searchResults}>
                                <Suspense fallback={
                                    <div className={styles.loading}>
                                        <div className={styles.spinner}></div>
                                        <p>Loading flights...</p>
                                    </div>
                                }>
                                    <FlightSearchResultsBrowser />
                                </Suspense>
                            </div>
                        </div>
                    </FlightSearchRequestProvider>
                </ActiveTripProvider>
            </main>
        </div>
    )
}