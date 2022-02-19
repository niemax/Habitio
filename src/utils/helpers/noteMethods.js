export const handleNoteEdit = (noteInputs, id, habitSetter, habits, input) => {
    const mappedInputs = noteInputs.map((note) => {
        if (note.id === id) {
            note.input = input;
        }
        return note;
    });

    const newHabits = habits.map((habit) => {
        if (habit.id === id) {
            habit.noteInputs = [...mappedInputs];
        }
        return habit;
    });
    habitSetter(newHabits);
};

export const handleNoteDelete = (habitId, noteId, habits, noteInputs, habitSetter) => {
    try {
        const filtered = noteInputs.filter((inp) => inp.id !== noteId);
        const newHabits = habits.map((habit) => {
            if (habit.id === habitId) {
                habit.noteInputs = filtered;
            }
            return habit;
        });
        habitSetter(newHabits);
    } catch (error) {
        console.error(error);
    }
};
