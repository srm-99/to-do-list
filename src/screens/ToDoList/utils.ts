import { KeyboardEvent } from "react";

export const parseDate = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
    const month =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
};

export const handleEnter = (fn: any) => (event: KeyboardEvent<any>) => {
    event.stopPropagation();
    const allowedCodes = ["Enter", "NumpadEnter"];
    allowedCodes.includes(event.code) && fn();
};
