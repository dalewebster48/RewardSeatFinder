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