export const getDateByDefaultFormat = (date: Date): string => {
    const inputDate = new Date(date);
    const yyyy = inputDate.getFullYear();
    let mm: number | string = inputDate.getMonth() + 1;
    let dd: number | string = inputDate.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + ' ' + mm + ' ' + yyyy;
};
