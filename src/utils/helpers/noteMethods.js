/**
 * ! handle all operations within notes in calendarModal
 */

export const handleNoteEdit = (diaryInputs, id, habitSetter, habits, data, input) => {
    const mappedInputs = diaryInputs.map((diaryInput) => {
        if (diaryInput.id === id) {
            diaryInput.input = input;
        }
        return diaryInput;
    });

    const newHabits = habits.map((habit) => {
        if (habit.id === data.id) {
            habit.diaryInputs = [...mappedInputs];
        }
        return habit;
    });
    habitSetter(newHabits);
};

export const handleNoteDelete = (id, habits, diaryInputs, data, habitSetter) => {
    const filtered = diaryInputs.filter((inp) => inp.id !== id);
    const newHabits = habits.map((habit) => {
        if (habit.id === data.id) {
            habit.diaryInputs = [...filtered];
        }
        return habit;
    });
    habitSetter(newHabits);
};
