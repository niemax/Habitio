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
        await Notifications.cancelScheduledNotificationAsync(id);
    } catch (error) {
        console.error(error);
    }
};

export const deleteNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

export const getAllNotifications = async () => {
    await Notifications.getAllScheduledNotificationsAsync().then((notification) => {
        console.log('Notification length', notification.length);
    });
};

export const scheduleRepeatingEdit = async (day, hours, minutes, name, habits, id) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: `Reminder to ${name}`,
        },
        trigger: {
            hour: hours,
            minute: minutes,
            weekday: day,
            repeats: true,
        },
    }).then((identifier) => {
        const arr = [];
        arr.push(identifier);
        habits.map((habit) => {
            if (habit.id === id) {
                habit.notificationId = arr;
            }
            return habit;
        });
    });
};

export const chRepeating = (day, name, hours, minutes) => {
    Notifications.scheduleNotificationAsync({
        content: {
            title: `Reminder to ${name}`,
        },
        trigger: {
            hour: hours,
            minute: minutes,
            weekday: day,
            repeats: true,
        },
    });
};

export const scheduleMoodNotification = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'How are you feeling today? 🤔',
            body: `Think about how you're feeling today and check in! ⚡️`,
        },
        trigger: {
            hour: 11,
            repeats: true,
        },
    });
};
