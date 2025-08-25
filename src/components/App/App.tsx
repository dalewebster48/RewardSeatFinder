import FlightSearchForm from "../FlightSearchForm/FlightSearchForm.js"
import FlightSearchResultsBrowser from "../FlightSearchResultsBrowser/FlightSearchResultsBrowser.js"
import styles from "./App.module.css"
import { FlightSearchRequestProvider } from "../../model/providers/FlightSearchProvider.js"
import { Suspense } from "react"

export default function App() {
    return (
        <div className={styles.app}>
            <main className={styles.main}>
                <FlightSearchRequestProvider>
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
                </FlightSearchRequestProvider>
            </main>
        </div>
    )
}