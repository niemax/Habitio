import { colors } from '../colors';
import { getCurrentDateFormattedForCalendarComponent, getCurrentDay } from './dateHelpers';
import { haptics } from './haptics';
import { toasts } from './toastMethods';

export const handleDoneToday = (id, name, habits, habitSetter) => {
    const calendarDateString = getCurrentDateFormattedForCalendarComponent();

    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(calendarDateString in completedDatesObj)) {
                completedDatesObj[calendarDateString] = {
                    selected: true,
                };
                if (habit.id === id) {
                    habit.dataCurrentDay = getCurrentDay();
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                    habit.streak.push(1);
                    toasts.info(name);
                    haptics.success();
                }
            } else {
                delete completedDatesObj[calendarDateString];
                if (habit.id === id) {
                    habit.dataCurrentDay = null;
                    habit.completed = false;
                    habit.completedDates = completedDatesObj;
                    habit.streak.pop();
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
                    marked: false,
                    selected: true,
                    customStyles: {
                        container: {
                            backgroundColor: colors.mainPurple,
                        },
                    },
                };
                if (habit.id === id) {
                    habit.completedDates = completedDatesObj;
                    habit.calendarDone = true;
                    habit.streak.push(1);
                    haptics.success();
                }
            } else {
                delete completedDatesObj[date];
                if (habit.id === id) {
                    habit.completedDates = completedDatesObj;
                    habit.calendarDone = false;
                    habit.streak.pop();
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
