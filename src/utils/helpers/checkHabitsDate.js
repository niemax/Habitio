/**
 * ! check if current day is higher than last completed day -> set habit.completed to false
 * ! to reset habits for the day.
 *  */

const checkDateForHabitCompletedReset = (habits, set) => {
    const day = new Date();
    const currentDay = day.getDay();
    try {
        const checkedHabits = habits.map((habit) => {
            if (currentDay > habit.completedDay) {
                habit.completed = false;
            }
            return habit;
        });
        set(checkedHabits);
    } catch (e) {
        console.error(e);
    }
};

export default checkDateForHabitCompletedReset;
