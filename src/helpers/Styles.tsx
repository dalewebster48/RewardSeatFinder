// Concat styles
export const cs = (styles: any[]) => {
    return styles.join(" ")
}
export const cs_if = (style: any, condition: boolean): string | null => {
    return condition ? style : null
}