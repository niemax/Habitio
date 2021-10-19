const checkHabitsDate = (getHabits, habitSetter, habits, currentDay) => {
    getHabits();
    try {
        const checkedHabits = habits.map((habit) => {
            if (currentDay > habit.currentDay) {
                habit.completed = false;
                setTimeout(() => {
                    getHabits();
                }, 1500);
            }
            return habit;
        });
        habitSetter(checkedHabits);
    } catch (e) {
        console.error(e);
    }
};

export default checkHabitsDate;
