import styles from "./MultiSelect.module.css"
import { useState } from "react"

export interface MultiSelectProps {
    values?: string[]
    onSelectedItemChange(index: number|null): any
}

function MultiSelect(props: MultiSelectProps) {
    const [selectedIndex, setSelectedIndex] = useState<number|null>()

    const items = props.values?.map((item, index) => {
        const isSelected = index == selectedIndex
        const classes = isSelected ? `${styles.item} ${styles.selected}` : styles.item

        return <div 
        className={classes} key={item}
        onClick={() => {
            if (isSelected) {
                setSelectedIndex(null)
                props.onSelectedItemChange(null)
            } else {
                setSelectedIndex(index)
                props.onSelectedItemChange(index)
            }
        }}
        >
            {item}
        </div>
    })

    return (
        <div className={styles.select}>
            {items}
        </div>
    )
}

export default MultiSelect