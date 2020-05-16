import moment from 'moment';

export function convertDate(date) {
    return moment(date).format('Y-MM-DD');
}