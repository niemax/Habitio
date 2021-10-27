export const handleDiaryInputDelete = (diaryInputs, id, habitSetter, data, input) => {
    const mappedInputs = diaryInputs.map((diaryInput) => {
        if (diaryInput.id === id) {
            diaryInput.input = input;
        }
        return diaryInput;
    });
    console.log(mappedInputs);
};

export const code = {};

// code
