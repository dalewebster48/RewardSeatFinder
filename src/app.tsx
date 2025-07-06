import FlightSearchForm from "./components/FlightSearchForm/FlightSearchForm.js"
import { Suspense } from "react"

export default function App() {
    return (
        <div className='app'>
            <Suspense fallback={
                <p>
                    Loading...
                </p>
            }>
                <FlightSearchForm />
            </Suspense>
        </div>
    )
}