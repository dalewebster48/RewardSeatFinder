import Airport from "./Airport.js"

export default interface Flight {
    id: string
    date: string
    start: Airport
    end: Airport

    economy_cost: string
    premium_cosnt: string
    upper_cost: string
}