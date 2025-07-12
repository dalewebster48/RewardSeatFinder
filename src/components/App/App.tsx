import FlightSearchForm from "../FlightSearchForm/FlightSearchForm.js"
import FlightSearchResultsBrowser from "../FlightSearchResultsBrowser/FlightSearchResultsBrowser.js"
import styles from "./App.module.css"
import { FlightSearchRequestProvider } from "../../model/providers/FlightSearchProvider.js"
import { Suspense } from "react"

export default function App() {
    return (
        <div className={styles.app}>
            <FlightSearchRequestProvider>
                <div className={styles.searchForm}>
                    <Suspense fallback={
                        <p>
                            Loading...
                        </p>
                    }>
                        <FlightSearchForm />
                    </Suspense>
                </div>
                <div className={styles.searchResults}>
                    <Suspense fallback={
                        <p>
                            Loading flights...
                        </p>
                    }>
                        <FlightSearchResultsBrowser />
                    </Suspense>
                </div>
            </FlightSearchRequestProvider>
        </div>
    )
}