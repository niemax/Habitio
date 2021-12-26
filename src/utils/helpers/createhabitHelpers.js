import { chRepeating, cHScheduleOneTime } from './notification';

/**
 * ! handles the creation of a habit in CreateHabit -> CreateHabitHeader component
 *
 */

const getParsedReminderTimeHours = (time) => {
    const reminderTimeHours = time.getHours();
    const reminderTimeMinutes = time.getMinutes();

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

const handleHabitCreation = async (
    newHabit,
    isEnabledDate,
    isEnabledSpecific,
    CRUDHabits,
    reminderTime,
    habitName,
    navigation,
    specificDate
) => {
    const { reminderTimeHours, reminderTimeMinutes } = getParsedReminderTimeHours(reminderTime);

    if (checkIfReminderDateIsEnabled(isEnabledDate)) {
        chRepeating(habitName, reminderTimeHours, reminderTimeMinutes, newHabit);
    }

    if (checkIfSpecificDateisEnabled(isEnabledSpecific)) {
        cHScheduleOneTime(habitName, specificDate, newHabit);
    }
    console.log(newHabit);
    CRUDHabits(newHabit);
    navigation.navigate('Homepage');
};

export default handleHabitCreation;
