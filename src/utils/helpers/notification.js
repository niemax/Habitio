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
