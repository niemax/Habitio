import { colors } from '../colors';
import { getCurrentDateFormattedForCalendarComponent, getCurrentDay } from './dateHelpers';
import { haptics } from './haptics';
import { toasts } from './toastMethods';

export const handleDoneToday = (id, name, habits, habitSetter) => {
    const getCalendarDateString = getCurrentDateFormattedForCalendarComponent();

    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(getCalendarDateString in completedDatesObj)) {
                completedDatesObj[getCalendarDateString] = {
                    selected: true,
                };
                if (habit.id === id) {
                    habit.completedDay = getCurrentDay();
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                    toasts.info(name);
                    haptics.success();
                }
            } else {
                delete completedDatesObj[getCalendarDateString];
                if (habit.id === id) {
                    habit.completedDay = null;
                    habit.completed = false;
                    habit.completedDates = completedDatesObj;
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
                    haptics.success();
                }
            } else {
                delete completedDatesObj[date];
                if (habit.id === id) {
                    habit.completedDates = completedDatesObj;
                    habit.calendarDone = false;
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
