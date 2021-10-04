import moment from 'moment';

export const getCurrentDate = (date = moment().format('dddd, MMMM Do, YYYY')) => {
    return { date };
};
