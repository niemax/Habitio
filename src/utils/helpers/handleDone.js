import { format } from 'date-fns';
import { colors } from '../colors';
import { haptics } from './haptics';
import { toasts } from './toastMethods';

/**
 * ! handle done for today
 */

const handleDoneToday = async (data, habits, currentDay, habitSetter) => {
    const { id, name, color } = data;
    const newDate = format(new Date(), 'yyyy-MM-dd');

    haptics.success();
    try {
        const updatedHabits = habits.map((habit) => {
            const completedDatesObj = { ...habit.completedDates };

            if (!(newDate in completedDatesObj)) {
                completedDatesObj[newDate] = {
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
                }
            } else {
                delete completedDatesObj[newDate];
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
