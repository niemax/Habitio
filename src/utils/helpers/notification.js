import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const cancelPushNotification = async (id) => {
    try {
        await Notifications.cancelScheduledNotificationAsync(id).then(() => {
            console.log(`Successfully cancelled notification with id: ${id}`);
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

export const getAllNotifications = async () => {
    await Notifications.getAllScheduledNotificationsAsync().then((notification) => {
        'Notification length', notification.length;
    });
};

export const scheduleRepeatingEdit = async (hours, minutes, name, habits, id) => {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: name,
            body: `Your daily reminder to ${name}`,
        },
        trigger: {
            hour: hours,
            minute: minutes,
            repeats: true,
        },
    });
    habits.map((habit) => {
        if (habit.id === id) {
            habit.notificationId = identifier;
        }
        return habit;
    });
};

export const scheduleOneTimeEdit = async (date, name, habits, id) => {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: name,
            body: `Your reminder for ${name}`,
        },
        trigger: {
            date: date,
            repeats: false,
        },
    });
    habits.map((habit) => {
        if (habit.id === id) {
            habit.notificationId = identifier;
        }
        return habit;
    });
};

export const chRepeating = async (name, hours, minutes, newHabit) => {
    try {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: name,
                body: `Your daily reminder to ${name}`,
            },
            trigger: {
                hour: hours,
                minute: minutes,
                repeats: true,
            },
        });

        Object.assign(newHabit, { notificationId: identifier });
    } catch (error) {
        console.error(error);
    }
    newHabit;
};

export const cHScheduleOneTime = async (name, date, newHabit) => {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: name,
            body: `Reminder to ${name}`,
        },
        trigger: {
            date: date,
            repeats: false,
        },
    });
    Object.assign(newHabit, { notificationId: identifier });
};
