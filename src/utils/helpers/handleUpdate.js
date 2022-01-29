import { cancelPushNotification, scheduleOneTimeEdit, scheduleRepeatingEdit } from './notification';

/**
 * ! handle update based on the habit id coming from route.params
 * ! updates the habit with new arguments and cancels a push notification
 * ! every time on save. If user has set another notification -> schedule
 * ! a new one.
 */

const checkReminderTimeForNullValuesAndParse = (reminderTime) => {
    const parsedHour = reminderTime !== null && reminderTime.getHours();
    const parsedMin = reminderTime !== null && reminderTime.getMinutes();

    return { parsedHour, parsedMin };
};

const scheduleRepeatingNotificationIfTimeIsNotNull = (time, habitName, habits, id) => {
    const { parsedHour, parsedMin } = checkReminderTimeForNullValuesAndParse(time);

    scheduleRepeatingEdit(parsedHour, parsedMin, habitName, habits, id);
};

const handleUpdate = async (
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
    if (notificationId !== undefined) cancelPushNotification(notificationId);

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
