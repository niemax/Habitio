import { format, getWeek } from 'date-fns';
import moment from 'moment';

export const getCurrentDay = (day = new Date()) => day.getDay();

export const getCurrentDateFormatted = (d = moment().format('ddd, ll')) => {
    return { date };
};

export const getCurrentDateFormattedForCalendarComponent = (
    newDate = format(new Date(), 'yyyy-MM-dd')
) => newDate;

export const getCurrentWeek = () => getWeek(new Date());

export const formatDateForInputModal = (d) => {
    const formattedDate = format(new Date(d), 'dd/MM/yy');
    return formattedDate;
};

export const formatDateForHabitEndDate = (d) => format(new Date(d), 'PP');

export const formatDateForHabitInfoReminder = (d) => format(new Date(d), 'p');
