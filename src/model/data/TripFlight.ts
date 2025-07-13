import Flight from "./Flight.js";
import FlightTier from "./FlightTier.js";

interface TripFlight {
    flight: Flight
    selectedTier: FlightTier
}

export default TripFlight