import { createContext, useContext, useState, ReactNode } from "react"
import Trip from "../data/Trip.js"

export interface ActiveTrip {
    trip: Trip | undefined
    updateTrip: (trip: Trip | undefined) => void
}

const ActiveTripContext = createContext<ActiveTrip | undefined>(undefined)

interface ActiveTripProviderProps {
    children: ReactNode
}

export const ActiveTripProvider = (props: ActiveTripProviderProps) => {
    const [trip, setTrip] = useState<Trip>()

    const updateTrip = (trip: Trip | undefined) => {
        setTrip(trip)
    }

    return (
        <ActiveTripContext.Provider value={{
            trip: trip,
            updateTrip: updateTrip
        }}>
            {props.children}
        </ActiveTripContext.Provider>
    )
}

export const useActiveTrip = () => {
    const context = useContext(ActiveTripContext)
    if (!context) {
        throw new Error('useFlightSearchRequest must be used within a ActiveTripProvider')
    }

    return context
}