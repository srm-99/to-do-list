import { KeyboardEvent } from "react";

export const parseDate = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const handleEnter = (fn: any) => (event: KeyboardEvent<any>) => {
    event.stopPropagation()
    event.code == "Enter" && fn()
}
