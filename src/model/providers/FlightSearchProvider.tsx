import { createContext, useContext, useState, ReactNode } from "react"
import FlightSearchRequest from "../data/FlightSearchRequest.js"

export interface FlightSearchRequestContext {
    request: FlightSearchRequest,
    updateRequest: (request: FlightSearchRequest) => void
}

const FlightSearchContexet = createContext<FlightSearchRequestContext|undefined>(undefined)

interface FlightSearchProviderProps {
    children: ReactNode
}

export const FlightSearchRequestProvider = (props: FlightSearchProviderProps) => {
    const [request, setRequest] = useState<FlightSearchRequest>({})

    const updateRequest = (request: FlightSearchRequest) => {
        setRequest(request)
    }

    return (
        <FlightSearchContexet.Provider value={{
            request, updateRequest
        }}>
            { props.children }
        </FlightSearchContexet.Provider>
    )
}

export const useFlightSearchRequest = () => {
    const context = useContext(FlightSearchContexet)
    if (!context) {
        throw new Error('useFlightSearchRequest must be used within a ThemeProvider')
    }

    return context
}