import { toasts } from './toastMethods';

const deleteHabit = (id, habits, habitSetter, cancelPushNotification, data, navigation) => {
    const newHabits = habits.filter((habit) => habit.id !== data.id);
    habitSetter(newHabits);
    cancelPushNotification(id);
    navigation.goBack();
    toasts.error();
};

export default deleteHabit;
