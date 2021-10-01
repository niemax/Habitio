import * as Notifications from 'expo-notifications';

export default async function schedulePushNotification(content, title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
            //content,
            title: title,
            body: body,
        },
        trigger: { seconds: 10 },
        repeats: true,
    });
}
