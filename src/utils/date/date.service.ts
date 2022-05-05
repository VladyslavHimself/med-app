import { Timestamp } from 'firebase/firestore';

export const getDateByDefaultFormat = (date: Timestamp): any => {
    const inputDate = date.toDate();
    const yyyy = inputDate.getFullYear();
    const mm: string = inputDate.toLocaleString('en-us', { month: 'long' }).slice(0, 3);
    let dd: number | string = inputDate.getDate();

    return `${dd} ${mm}, ${yyyy}`;
};
