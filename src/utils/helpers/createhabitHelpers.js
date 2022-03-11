import { getHours, getMinutes } from 'date-fns';
import { chRepeating } from './notification';

export const convertWeekdaysToNumbers = (arr) => {
    if (!arr.length) return [];
    let newArr = [];

    arr.forEach((item) => {
        switch (item) {
            case 'mon':
                return newArr.push(2);
                break;
            case 'tue':
                return newArr.push(3);
                break;
            case 'wed':
                return newArr.push(4);
                break;
            case 'thu':
                return newArr.push(5);
                break;
            case 'fri':
                return newArr.push(6);
                break;
            case 'sat':
                return newArr.push(7);
                break;
            case 'sun':
                return newArr.push(1);
                break;
        }
    });
    return newArr;
};

const getParsedReminderTimeHours = (time) => {
    const reminderTimeHours = getHours(time);
    const reminderTimeMinutes = getMinutes(time);

    return { reminderTimeHours, reminderTimeMinutes };
};

const checkIfReminderDateIsEnabled = (enabledDate) => {
    if (!enabledDate) return false;

    return true;
};

const handleHabitCreation = ({ newHabit, isEnabledDate, CRUDHabits, reminderTime, weekdays }) => {
    if (checkIfReminderDateIsEnabled(isEnabledDate)) {
        const { reminderTimeHours, reminderTimeMinutes } = getParsedReminderTimeHours(reminderTime);
        const notificationDays = convertWeekdaysToNumbers(weekdays);
        notificationDays?.forEach((day) => {
            chRepeating(day, newHabit.name, reminderTimeHours, reminderTimeMinutes, newHabit);
        });
    }
    CRUDHabits(newHabit);
};

export default handleHabitCreation;
