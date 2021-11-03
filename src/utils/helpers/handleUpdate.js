import { cancelPushNotification, scheduleOneTimeEdit, scheduleRepeatingEdit } from './notification';

const handleUpdate = async (
    data,
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
    const { id } = data;
    cancelPushNotification(notificationId);
    const parsedReminderTimeHour = habitReminderTime !== null && habitReminderTime.getHours();
    const parsedReminderTimeMinute = habitReminderTime !== null && habitReminderTime.getMinutes();

    if (habitReminderTime !== null) {
        scheduleRepeatingEdit(
            parsedReminderTimeHour,
            parsedReminderTimeMinute,
            habitName,
            habits,
            data
        );
    }
    if (habitSpecificDate !== null) {
        scheduleOneTimeEdit(habitSpecificDate, habitName, habits, data);
    }
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

    habitSetter(newHabits);
};

export default handleUpdate;
