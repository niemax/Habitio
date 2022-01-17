import { cancelPushNotification } from './notification';
import { toasts } from './toastMethods';

const deleteHabit = (habits, habitSetter, notificationId, id) => {
    const newHabits = habits.filter((habit) => habit.id !== id);
    habitSetter(newHabits);
    cancelPushNotification(notificationId);
    toasts.error('Habit', 'deleted');
};

export default deleteHabit;
