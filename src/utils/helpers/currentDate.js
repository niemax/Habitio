import moment from 'moment';

const getCurrentDate = (date = moment().format('dddd, MMMM Do YYYY')) => {
    return { date };
};

export default getCurrentDate;
