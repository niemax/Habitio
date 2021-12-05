import { getCurrentDayNumber } from './currentDate';

/**
 * ! check if current day is higher than last completed day -> set habit.completed to false
 * ! to reset habits for the day.
 *  */

const checkDateForHabitCompletedReset = (habits, set) => {
    try {
        const checkedHabits = habits.map((habit) => {
            if (getCurrentDayNumber() > habit.completedDay) {
                habit.completed = false;
                habit.progress = 0;
            }
            return habit;
        });
        set(checkedHabits);
    } catch (e) {
        console.error(e);
    }
};

export default checkDateForHabitCompletedReset;
