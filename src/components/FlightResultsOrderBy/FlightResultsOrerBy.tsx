import { useState } from "react";
import styles from "./FlightResultsOrderBy.module.css"
import FlightOrder from "../../model/data/FlightsOrder.js"
import SortOrder from "../../model/data/SortOrder.js"
import { cs_if } from "../../helpers/Styles.js";

export interface FlightResultsOrderByProps {
    orderChanged: (criteria: FlightOrder | null, order: SortOrder) => void;
}

function FlightResultsOrderBy(props: FlightResultsOrderByProps) {
    const [orderCriteria, setOrderCriteria] = useState<FlightOrder | null>(null)
    const [order, setOrder] = useState<SortOrder>(SortOrder.Ascending)

    const orderSelected = (criteria: FlightOrder) => {
        // if this criteria is not selected then set it and the order to ascending
        // if the criteria is already selected then toggle the order to descending
        // if the critieria is already selected and the order is descending then remove the criteria
        if (orderCriteria !== criteria) {
            setOrderCriteria(criteria)
            setOrder(SortOrder.Ascending)
            props.orderChanged(criteria, SortOrder.Ascending)
        } else if (order === SortOrder.Ascending) {
            setOrder(SortOrder.Descending)
            props.orderChanged(criteria, SortOrder.Descending)
        } else {
            setOrderCriteria(null)
            setOrder(SortOrder.Ascending)
            props.orderChanged(null, SortOrder.Ascending)
        }
    }

    const getButtonClass = (criteria: FlightOrder) => {
        return orderCriteria === criteria ? styles.selected : "";
    }

    const getSortIcon = (criteria: FlightOrder) => {
        if (orderCriteria !== criteria) return "";
        return order === SortOrder.Ascending ? " ↑" : " ↓";
    }

    return (
        <div className={styles.orderBy}>
            <span>
                Order By:
            </span>
            <span>
                <button className={getButtonClass(FlightOrder.DATE)} onClick={() => {
                    orderSelected(FlightOrder.DATE)
                }}>
                    Date{getSortIcon(FlightOrder.DATE)}
                </button>
                <button className={getButtonClass(FlightOrder.ECONOMY_PRICE)} onClick={() => {
                    orderSelected(FlightOrder.ECONOMY_PRICE)
                }}>
                    Economy Points{getSortIcon(FlightOrder.ECONOMY_PRICE)}
                </button>
                <button className={getButtonClass(FlightOrder.PREMIUM_PRICE)} onClick={() => {
                    orderSelected(FlightOrder.PREMIUM_PRICE)
                }}>
                    Premium Points{getSortIcon(FlightOrder.PREMIUM_PRICE)}
                </button>
                <button className={getButtonClass(FlightOrder.UPPER_CLASS_PRICE)} onClick={() => {
                    orderSelected(FlightOrder.UPPER_CLASS_PRICE)
                }}>
                    Upper Class Points{getSortIcon(FlightOrder.UPPER_CLASS_PRICE)}
                </button>
            </span>
        </div>
    )
}

export default FlightResultsOrderBy