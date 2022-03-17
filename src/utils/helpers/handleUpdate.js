import { getHours, getMinutes } from 'date-fns';
import { convertWeekdaysToNumbers } from './createhabitHelpers';
import { cancelPushNotification, scheduleRepeatingEdit } from './notification';

const checkReminderTimeForNullValuesAndParse = (reminderTime) => {
    const parsedHour = getHours(reminderTime);
    const parsedMin = getMinutes(reminderTime);

    return { parsedHour, parsedMin };
};

const handleUpdate = (
    id,
    notificationId,
    habits,
    habitSetter,
    habitName,
    unitValue,
    color,
    description,
    timesCount,
    habitReminderTime,
    endDate,
    selectedFrequency,
    habitNature,
    weekdays
) => {
    cancelPushNotification(notificationId).then(() => {
        if (habitReminderTime !== null) {
            const { parsedHour, parsedMin } =
                checkReminderTimeForNullValuesAndParse(habitReminderTime);
            const notificationDays = convertWeekdaysToNumbers(weekdays);
            notificationDays?.forEach((day) => {
                scheduleRepeatingEdit(day, parsedHour, parsedMin, habitName, habits, id);
            });
        }

        const newHabits = habits.map((habit) => {
            if (habit.id === id) {
                habit.name = habitName;
                habit.unitValue = unitValue;
                habit.color = color;
                habit.description = description;
                habit.times = timesCount;
                habit.reminder = habitReminderTime !== null && habitReminderTime;
                habit.endDate = endDate;
                habit.frequency = selectedFrequency;
                habit.habitGoal = habitNature;
                habit.selectedWeekdays = weekdays;
            }
            return habit;
        });
        habitSetter(newHabits);
    });
};

export default handleUpdate;
