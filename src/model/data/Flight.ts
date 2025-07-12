import Airport from "./Airport.js"

export default interface Flight {
    id: string
    date: string
    start: Airport
    end: Airport

    economy_cost: string
    premium_cost: string
    upper_cost: string

    economy_deal: boolean
    premium_deal: boolean
    upper_deal: boolean
}