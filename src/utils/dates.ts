import moment from 'moment';

export const dateToUTC = (date: Date) => {
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    const utc_date = moment.utc(dateObj).toDate();
    return utc_date;
};
