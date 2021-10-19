import { toasts } from './toastMethods';

const deleteHabit = (id, habits, habitSetter, cancelPushNotification, setModalVisible, data) => {
    const newHabits = habits.filter((habit) => habit.id !== data.id);
    habitSetter(newHabits);
    setModalVisible(false);
    cancelPushNotification(id);
    toasts.error();
};

export default deleteHabit;
