import styles from "./ToggleButtonGroup.module.css"
import { useState } from "react"

export interface ToggleButtonGroupProps {
    values?: string[]
    onSelectedItemsChange(indices: number[]): any
    disabled?: boolean
    placeholder?: string
    multiSelect?: boolean
    selectedIndices?: number[]
}

function ToggleButtonGroup(props: ToggleButtonGroupProps) {
    const [internalSelectedIndices, setInternalSelectedIndices] = useState<number[]>([])
    
    // Use external selectedIndices if provided, otherwise use internal state
    const selectedIndices = props.selectedIndices ?? internalSelectedIndices

    if (props.disabled || !props.values || props.values.length === 0) {
        return (
            <div className={styles.placeholder}>
                {props.placeholder || "No options available"}
            </div>
        )
    }

    const buttons = props.values.map((item, index) => {
        const isSelected = selectedIndices.includes(index)
        const classes = isSelected ? `${styles.button} ${styles.selected}` : styles.button

        return (
            <button
                key={item}
                className={classes}
                onClick={() => {
                    let newIndices: number[]
                    
                    if (props.multiSelect) {
                        // Multi-select mode: toggle the item
                        if (isSelected) {
                            newIndices = selectedIndices.filter(i => i !== index)
                        } else {
                            newIndices = [...selectedIndices, index]
                        }
                    } else {
                        // Single-select mode: toggle or select one
                        if (isSelected) {
                            newIndices = []
                        } else {
                            newIndices = [index]
                        }
                    }
                    
                    // Only update internal state if we're not using external control
                    if (props.selectedIndices === undefined) {
                        setInternalSelectedIndices(newIndices)
                    }
                    props.onSelectedItemsChange(newIndices)
                }}
            >
                {item}
            </button>
        )
    })

    return (
        <div className={styles.group}>
            {buttons}
        </div>
    )
}

export default ToggleButtonGroup
