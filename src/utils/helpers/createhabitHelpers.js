import { chRepeating, cHScheduleOneTime } from './notification';

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
    const reminderTimeHours = reminderTime.getHours();
    const reminderTimeMinutes = reminderTime.getMinutes();
    if (isEnabledDate) chRepeating(habitName, reminderTimeHours, reminderTimeMinutes, newHabit);
    if (isEnabledSpecific) cHScheduleOneTime(habitName, specificDate, newHabit);
    CRUDHabits(newHabit);
    console.log(newHabit);
    navigation.navigate('Homepage');
};

export default handleHabitCreation;
