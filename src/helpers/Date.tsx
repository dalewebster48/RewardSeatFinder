export const standardToPicker = (standard: string): string => {
    return standard.split("/").reverse().join("-")
}

export const pickerToStandard = (picker: string): string => {
    return picker.split("-").reverse().join("/")
}

export const dateToPicker = (date: Date): string => {
    return date.toISOString().split('T')[0]
}