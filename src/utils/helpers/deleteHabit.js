import { cancelPushNotification } from './notification';
import { toasts } from './toastMethods';

const deleteHabit = (habits, habitSetter, data) => {
    const { id } = data;
    const newHabits = habits.filter((habit) => habit.id !== data.id);
    habitSetter(newHabits);
    cancelPushNotification(id);
    toasts.error('Habit', 'deleted');
};

export default deleteHabit;
