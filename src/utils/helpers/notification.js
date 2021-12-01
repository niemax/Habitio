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
        console.log('Notification length', notification.length);
    });
};

export const scheduleOneTimeWeekNotification = async (currentDay) => {
    switch (currentDay) {
        case 1:
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Habitio',
                    body: `Great start to your week! Keep it up for the rest of the week.`,
                },
                trigger: {
                    seconds: 20 * 60,
                },
            });
            break;
        case 3:
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Habitio',
                    body: `It's the middle of the week. Keep doing what you're doing, you can do it!`,
                },
                trigger: {
                    seconds: 20 * 60 * 60,
                },
            });
            break;
        case 0:
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Habitio',
                    body: `Sundays are chill. Be chill yourself too!`,
                },
                trigger: {
                    seconds: 20 * 60,
                },
            });
            break;
        default:
    }
};

export const scheduleRepeatingEdit = async (hours, minutes, name, habits, data) => {
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
        if (habit.id === data.id) {
            habit.notificationId = identifier;
        }
        return habit;
    });
};

export const scheduleOneTimeEdit = async (date, name, habits, data) => {
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
        if (habit.id === data.id) {
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
    console.log(newHabit);
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
