import { cancelPushNotification, scheduleOneTimeEdit, scheduleRepeatingEdit } from './notification';

const checkReminderTimeForNullValuesAndParse = (reminderTime) => {
    const parsedHour = reminderTime?.getHours();
    const parsedMin = reminderTime?.getMinutes();

    return { parsedHour, parsedMin };
};

const scheduleRepeatingNotificationIfTimeIsNotNull = (time, habitName, habits, id) => {
    const { parsedHour, parsedMin } = checkReminderTimeForNullValuesAndParse(time);

    scheduleRepeatingEdit(parsedHour, parsedMin, habitName, habits, id);
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
    daysCount,
    timesCount,
    habitReminderTime,
    habitSpecificDate,
    endDate
) => {
    Promise.resolve(cancelPushNotification(notificationId));

    const newHabits = habits.map((habit) => {
        if (habit.id === id) {
            habit.name = habitName;
            habit.unitValue = unitValue;
            habit.color = color;
            habit.description = description;
            habit.days = daysCount;
            habit.times = timesCount;
            habit.reminder = habitReminderTime !== null ? habitReminderTime : null;
            habit.specificDate = habitSpecificDate !== null ? habitSpecificDate : null;
            habit.endDate = endDate;
        }
        return habit;
    });
    scheduleRepeatingNotificationIfTimeIsNotNull(habitReminderTime, habitName, habits, id);
    if (habitSpecificDate !== null) scheduleOneTimeEdit(habitSpecificDate, habitName, habits, id);
    habitSetter(newHabits);
};

export default handleUpdate;
