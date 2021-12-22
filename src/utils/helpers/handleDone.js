import { colors } from '../colors';
import { getCurrentDateFormattedForCalendarComponent, getCurrentDay } from './dateHelpers';
import { haptics } from './haptics';
import { toasts } from './toastMethods';

const handleDoneToday = (data, habits, habitSetter) => {
    const { id, name, color } = data;
    const getCalendarDateString = getCurrentDateFormattedForCalendarComponent();

    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(getCalendarDateString in completedDatesObj)) {
                completedDatesObj[getCalendarDateString] = {
                    marked: false,
                    selected: true,
                    customStyles: {
                        container: {
                            backgroundColor: colors.mainGreen,
                        },
                    },
                };
                if (habit.id === id) {
                    habit.completedDay = getCurrentDay();
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                    toasts.info(name, color);
                    haptics.success();
                }
            } else {
                delete completedDatesObj[getCalendarDateString];
                if (habit.id === id) {
                    habit.completed = false;
                    habit.completedDates = completedDatesObj;
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

export default handleDoneToday;
