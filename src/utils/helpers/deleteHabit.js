const deleteHabit = () => {
    const newHabits = habits.filter((habit) => habit.id !== data.id);
    habitSetter(newHabits);
    setModalVisible(false);
    cancelPushNotification(data.notificationId);
};
