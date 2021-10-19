const diaryInputHandler = (item, day, input, habits, habitSetter) => {
    const diaryInputObj = {
        date: day,
        input: input,
    };
    try {
        const updatedHabits = habits.filter((habit) => {
            if (habit.id === item.id) {
                habit.diaryInputs.push(diaryInputObj);
            }
            return habit;
        });
        habitSetter(updatedHabits);
    } catch (e) {
        console.error(e);
    }
};

export default diaryInputHandler;
