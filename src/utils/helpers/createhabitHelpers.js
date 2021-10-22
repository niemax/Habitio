import { chRepeating, cHScheduleOneTime } from './notification';

const handleHabitCreation = async (
    newHabit,
    setLoading,
    isEnabledDate,
    isEnabledSpecific,
    CRUDHabits,
    reminderTime,
    habitName,
    navigation,
    specificDate
) => {
    setLoading(true);

    const reminderTimeHours = reminderTime.getHours();
    const reminderTimeMinutes = reminderTime.getMinutes();
    if (isEnabledDate) chRepeating(habitName, reminderTimeHours, reminderTimeMinutes, newHabit);
    if (isEnabledSpecific) cHScheduleOneTime(habitName, specificDate, newHabit);
    CRUDHabits(newHabit);
    console.log(newHabit);

    setTimeout(() => {
        setLoading(false);
        navigation.navigate('MainTab');
    }, 2000);
};

export default handleHabitCreation;
