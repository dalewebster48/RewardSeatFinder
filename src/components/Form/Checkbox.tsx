import styles from "./Checkbox.module.css"
import { useState } from "react"
import { cs, cs_if } from "../../helpers/Styles.js"

export interface CheckboxProps {
    label: string
    onChange(checked: boolean): any
}

function Checkbox(props: CheckboxProps) {
    const [checked, setChecked] = useState(false)

    return (
        <div className={styles.checkbox} onClick={() => {
            const newValue = !checked
            setChecked(newValue)
            props.onChange(newValue)
        }}>
            <span className={cs([
                styles.box,
                cs_if(styles.selected, checked)
            ])}></span>
            <span className={styles.label}>
                {props.label}
            </span>
        </div>
    )
}

export default Checkbox