import { format } from 'date-fns';
import { colors } from '../colors';
import { haptics } from './haptics';
import { toasts } from './toastMethods';

const handleDoneToday = async (data, habits, currentDay, modalizeRef, animation, habitSetter) => {
    const { name, color } = data;
    const newDate = format(new Date(), 'yyyy-MM-dd');

    haptics.success();
    try {
        const updatedHabits = habits.filter((habit) => {
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
                if (habit.name === name) {
                    habit.completedDay = currentDay;
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                    if (Object.keys(data.completedDates).length % 3 !== 0)
                        toasts.info(name, color, modalizeRef);
                }
            } else {
                delete completedDatesObj[newDate];
                if (habit.name === name) {
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
