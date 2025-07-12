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

export interface NumberInputProps {
    label: string
    onChange?: (value: number) => void
}

export function NumberInput(props: NumberInputProps) {
    return (
        <div className={styles.numberInputContainer}>
            <label>
                { props.label }
            </label>
            <input type="number" onChange={e => props.onChange?.(Number(e.target.value))} />
        </div>
    )
}