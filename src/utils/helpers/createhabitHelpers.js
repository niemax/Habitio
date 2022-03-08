import { getHours, getMinutes } from 'date-fns';
import { chRepeating, cHScheduleOneTime } from './notification';

/**
 * ! handles the creation of a habit in CreateHabit -> CreateHabitHeader component
 *
 */

const getParsedReminderTimeHours = (time) => {
    const reminderTimeHours = getHours(time);
    const reminderTimeMinutes = getMinutes(time);

    return { reminderTimeHours, reminderTimeMinutes };
};

const checkIfReminderDateIsEnabled = (enabledDate) => {
    if (!enabledDate) return false;

    return true;
};

const checkIfSpecificDateisEnabled = (enabledSpecific) => {
    if (!enabledSpecific) return false;

    return true;
};

const handleHabitCreation = ({
    newHabit,
    isEnabledDate,
    isEnabledSpecific,
    CRUDHabits,
    reminderTime,
    specificDate,
}) => {
    const { reminderTimeHours, reminderTimeMinutes } = getParsedReminderTimeHours(reminderTime);

    if (checkIfReminderDateIsEnabled(isEnabledDate)) {
        chRepeating(newHabit.name, reminderTimeHours, reminderTimeMinutes, newHabit);
    }

    if (checkIfSpecificDateisEnabled(isEnabledSpecific)) {
        cHScheduleOneTime(newHabit.name, specificDate, newHabit);
    }
    CRUDHabits(newHabit);
};

export default handleHabitCreation;
