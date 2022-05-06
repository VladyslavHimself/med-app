import { Timestamp } from 'firebase/firestore';

export const getDateByDefaultFormat = (date: Timestamp): string => {
    const inputDate = date.toDate();
    const yyyy = inputDate.getFullYear();
    const mm: string = inputDate.toLocaleString('en-us', { month: 'long' }).slice(0, 3);
    let dd: number | string = inputDate.getDate();

    return `${dd} ${mm}, ${yyyy}`;
};

export const convertDateToTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date);
};

export const getAge = (date: Timestamp): string => {
    const inputDate = date.toDate();
    const today = new Date();
    const birthDate = new Date(inputDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
};
