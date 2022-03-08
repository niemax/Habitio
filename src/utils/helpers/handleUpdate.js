import { getHours, getMinutes } from 'date-fns';
import { cancelPushNotification, scheduleOneTimeEdit, scheduleRepeatingEdit } from './notification';

const checkReminderTimeForNullValuesAndParse = (reminderTime) => {
    const parsedHour = getHours(reminderTime);
    const parsedMin = getMinutes(reminderTime);

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
    endDate,
    selectedFrequency
) => {
    await cancelPushNotification(notificationId);

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
            habit.frequency = selectedFrequency;
        }
        return habit;
    });
    if (!!reminderTime) {
        scheduleRepeatingNotificationIfTimeIsNotNull(habitReminderTime, habitName, habits, id);
    }
    if (habitSpecificDate !== null) scheduleOneTimeEdit(habitSpecificDate, habitName, habits, id);
    habitSetter(newHabits);
};

export default handleUpdate;
