import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default async function schedulePushNotification(content, trigger, repeats) {
    await Notifications.scheduleNotificationAsync({
        content: content,
        trigger: trigger,
        repeats: repeats,
    });
}
const identifier = schedulePushNotification();

export const cancelPushNotification = async () => {
    await Notifications.cancelScheduledNotificationAsync(identifier);
};
