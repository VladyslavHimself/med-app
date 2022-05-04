export const getDateByDefaultFormat = (date: Date): string => {
    const inputDate = new Date(date);
    const yyyy = inputDate.getFullYear();
    const mm: string = date.toLocaleString('default', { month: 'long' });
    let dd: number | string = inputDate.getDate();

    if (dd < 10) dd = '0' + dd;

    return `${dd} ${mm.slice(0, 3)}, ${yyyy}`;
};
