import { colors } from '../colors';
import { getCurrentDateFormattedForCalendarComponent } from './currentDate';
import { haptics } from './haptics';
import { toasts } from './toastMethods';

const handleDoneToday = (data, habits, currentDay, habitSetter) => {
    const { id, name, color } = data;
    const getCalendarDate = getCurrentDateFormattedForCalendarComponent();

    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(getCalendarDate in completedDatesObj)) {
                completedDatesObj[getCalendarDate] = {
                    marked: false,
                    selected: true,
                    customStyles: {
                        container: {
                            backgroundColor: colors.mainGreen,
                        },
                    },
                };
                if (habit.id === id) {
                    habit.completedDay = currentDay;
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                    toasts.info(name, color);
                    haptics.success();
                }
            } else {
                delete completedDatesObj[getCalendarDate];
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
