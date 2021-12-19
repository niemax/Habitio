import { format, getWeek } from 'date-fns';
import moment from 'moment';

export const getCurrentDay = (day = new Date()) => day.getDay();

export const getCurrentDateFormatted = (date = moment().format('dddd, MMMM Do')) => {
    return { date };
};

export const getCurrentDateFormattedForCalendarComponent = (
    newDate = format(new Date(), 'yyyy-MM-dd')
) => newDate;

export const getCurrentWeek = () => getWeek(new Date());

export const getCurrentDayNumber = () => {
    const date = new Date();
    return date.getDay();
};

export const formatDateForInputModal = (date) => {
    const formattedDate = format(new Date(date), 'dd-MM-yyyy');
    return formattedDate;
};

export const formatDateForHabitEndDate = (date) => format(new Date(date), 'PP');

export const formatDateForHabitInfoReminder = (date) => format(new Date(date), 'p');
