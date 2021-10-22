/**
 * ! check if current day is higher than last completed day -> set habit.completed to false
 * ! to reset for the day.
 *  */

const checkDateForHabitCompletedReset = (getHabits, habitSetter, habits, currentDay) => {
    getHabits();
    try {
        const checkedHabits = habits.map((habit) => {
            if (currentDay > habit.completedDay) {
                habit.completed = false;
                getHabits();
            }
            return habit;
        });
        habitSetter(checkedHabits);
    } catch (e) {
        console.error(e);
    }
};

export default checkDateForHabitCompletedReset;
