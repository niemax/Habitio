/**
 * ! handle all operations within notes in calendarModal
 */

export const handleNoteEdit = (noteInputs, id, habitSetter, habits, data, input) => {
    const mappedInputs = noteInputs.map((note) => {
        if (note.id === id) {
            note.input = input;
        }
        return diaryInput;
    });

    const newHabits = habits.map((habit) => {
        if (habit.id === data.id) {
            habit.noteInputs = [...mappedInputs];
        }
        return habit;
    });
    habitSetter(newHabits);
};

export const handleNoteDelete = (id, habits, noteInputs, data, habitSetter) => {
    const filtered = noteInputs.filter((inp) => inp.id !== id);
    const newHabits = habits.map((habit) => {
        if (habit.id === data.id) {
            habit.noteInputs = [...filtered];
        }
        return habit;
    });
    habitSetter(newHabits);
};
