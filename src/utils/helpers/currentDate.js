import moment from 'moment';

const getCurrentDate = (date = moment().locale('fi').format('LL')) => {
    return { date };
};

export default getCurrentDate;
