import { cancelPushNotification } from './notification';
import { toasts } from './toastMethods';
import * as Notifications from 'expo-notifications';

const deleteHabit = async (habits, habitSetter, notificationId, id) => {
    Promise.resolve(await Notifications.cancelScheduledNotificationAsync(notificationId)).then(
        () => {
            const newHabits = habits.filter((habit) => habit.id !== id);
            habitSetter(newHabits);
            toasts.error('Habit', 'deleted');
        }
    );
};

export default deleteHabit;
