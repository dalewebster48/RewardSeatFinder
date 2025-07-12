import styles from "./DatePicker.module.css"
import { dateToPicker, pickerToStandard } from "../../helpers/Date.js"

interface DatePickerProps {
    onChange(date: string): any
}

function DatePicker(props: DatePickerProps) {
    return (
        <div className={styles.picker}>
            <input
                type="date"
                min={
                    dateToPicker(new Date())
                }
                onChange={e => {
                    props.onChange(
                        pickerToStandard(e.currentTarget.value)
                    )
                }}
            />
        </div>
    )
}

export default DatePicker