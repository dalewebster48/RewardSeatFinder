import styles from "./Form.module.css"

export interface TextInputProps {
    value?: string
    placeholder?: string
}

export function TextInput(props: TextInputProps) {
    return (
        <div className={styles.textInputContainer}>
            <input type="text" value={props.value} placeholder={props.placeholder}/>
        </div>
    )
}

export interface MultiSelectProps {
    values?: string[]
}

export function MultiSelect(props: MultiSelectProps) {
    const items = props.values?.map(item => {
        return <option value={item} key={item}>
            { item }
        </option>
    })

    return (
        <div className={styles.multiSelect}>
            <select multiple>
                { items }
            </select>
        </div>
    )
}