import { getCurrentDateFormattedForCalendarComponent } from './dateHelpers';
import { haptics } from './haptics';

export const handleDoneToday = (id, name, habits, habitSetter) => {
    const calendarDateString = getCurrentDateFormattedForCalendarComponent();

    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(calendarDateString in completedDatesObj)) {
                completedDatesObj[calendarDateString] = {
                    date: new Date(),
                    marked: true,
                };
                if (habit.id === id) {
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                    habit.timesDoneThisWeek = habit.times;
                    haptics.success();
                }
            } else {
                delete completedDatesObj[calendarDateString];
                if (habit.id === id) {
                    habit.completed = false;
                    habit.completedDates = completedDatesObj;
                    habit.timesDoneThisWeek = habit.progress;
                    haptics.warning();
                }
            }
            return habit;
        });
        habitSetter(updatedHabits);
    } catch (error) {
        console.error(error);
    }
};

export const handleDoneOtherDay = (date, id, habits, habitSetter) => {
    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(date in completedDatesObj)) {
                completedDatesObj[date] = {
                    selected: true,
                    date: new Date(date),
                };
                if (habit.id === id) {
                    habit.completedDates = completedDatesObj;
                    habit.calendarDone = true;
                    habit.timesDoneThisWeek = habit.times;
                    haptics.success();
                }
            } else {
                delete completedDatesObj[date];
                if (habit.id === id) {
                    habit.completedDates = completedDatesObj;
                    habit.calendarDone = false;
                    habit.timesDoneThisWeek = habit.progress;
                    haptics.warning();
                }
            }
            return habit;
        });
        habitSetter(updatedHabits);
    } catch (e) {
        console.error(e);
    }
};
