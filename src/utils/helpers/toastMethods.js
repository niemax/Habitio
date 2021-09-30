import { showMessage } from 'react-native-flash-message';

const words = ['Awesome!', 'Splendid!', 'Horrendous!', 'Excellent!', 'Great!', 'Enormous!'];

const randomWord = words[Math.floor(Math.random() * words.length)];

export const toasts = {
    info: (habitName, color) => {
        showMessage({
            duration: 2500,
            message: randomWord,
            description: `You completed ${habitName},\nkeep it up!`,
            backgroundColor: color, // background color
            textStyle: {
                fontFamily: 'SemiBold',
                fontSize: 16,
            },
        });
    },
};

export const fuckOffLinter = {};
