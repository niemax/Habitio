import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default async function schedulePushNotification(content, trigger, repeats) {
    await Notifications.scheduleNotificationAsync({
        content: content,
        trigger: trigger,
        repeats: repeats,
    });
}

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
                    seconds: 20 * 60,
                },
            });
            break;
        case 0:
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Habitio',
                    body: `Remember also to take time to relax and not worry about habits.`,
                },
                trigger: {
                    seconds: 20 * 60,
                },
            });
            break;
        default:
    }
};
