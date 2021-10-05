import { showMessage } from 'react-native-flash-message';

const words = ['Awesome!', 'Splendid!', 'Horrendous!', 'Excellent!', 'Great!'];

const randomWord = words[Math.floor(Math.random() * words.length)];

export const toasts = {
    info: (habitName, color) => {
        showMessage({
            duration: 3500,
            message: randomWord,
            description: `You completed ${habitName},\nkeep it up!`,
            backgroundColor: color, // background color
            titleStyle: {
                fontFamily: 'Bold',
                fontSize: 17,
            },
            textStyle: {
                fontFamily: 'Medium',
                fontSize: 15,
            },
            floating: 'true',
            icon: 'success',
        });
    },
    error: (habitName, color) => {
        showMessage({
            duration: 3500,
            description: `${habitName} deleted!`,
            backgroundColor: color, // background color
            titleStyle: {
                fontFamily: 'Bold',
                fontSize: 17,
            },
            textStyle: {
                fontFamily: 'Medium',
                fontSize: 15,
            },
            floating: 'true',
            icon: 'success',
        });
    },
};

export const fuckOffLinter = {};
