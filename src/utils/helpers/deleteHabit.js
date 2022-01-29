import { cancelPushNotification } from './notification';
import { toasts } from './toastMethods';

const deleteHabit = (habits, habitSetter, notificationId, id) => {
    cancelPushNotification(notificationId);
    const newHabits = habits.filter((habit) => habit.id !== id);
    habitSetter(newHabits);
    toasts.error('Habit', 'deleted');
};

export default deleteHabit;
