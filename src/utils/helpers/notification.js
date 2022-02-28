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
        await Notifications.cancelScheduledNotificationAsync(id).then((identifier) => {
            console.log(`Successfully cancelled notification with id: ${identifier}`);
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
        console.log('Notification length', notification.length);
    });
};

export const scheduleRepeatingEdit = async (hours, minutes, name, habits, id) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: name,
            body: `Your daily reminder to ${name}`,
        },
        trigger: {
            hour: hours,
            minute: minutes,
            repeats: true,
        },
    }).then((identifier) => {
        habits.map((habit) => {
            if (habit.id === id) {
                habit.notificationId = identifier;
            }
            return habit;
        });
    });
};

export const scheduleOneTimeEdit = async (date, name, habits, id) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: name,
            body: `Your reminder for ${name}`,
        },
        trigger: {
            date: date,
            repeats: false,
        },
    }).then((identifier) => {
        habits.forEach((habit) => {
            if (habit.id === id) {
                habit.notificationId = identifier;
            }
        });
    });
};

export const chRepeating = async (name, hours, minutes, newHabit) => {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: name,
                body: `Your daily reminder to ${name}`,
            },
            trigger: {
                hour: hours,
                minute: minutes,
                repeats: true,
            },
        })
            .then((identifier) => Object.assign(newHabit, { notificationId: identifier }))
            .finally(() => console.log(newHabit));
    } catch (error) {
        console.error(error);
    }
};

export const cHScheduleOneTime = async (name, date, newHabit) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: name,
            body: `Reminder to ${name}`,
        },
        trigger: {
            date: date,
            repeats: false,
        },
    }).then((identifier) => Object.assign(newHabit, { notificationId: identifier }));
};
