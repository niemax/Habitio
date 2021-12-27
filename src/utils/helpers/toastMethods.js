import { showMessage } from 'react-native-flash-message';
import { colors } from '../colors';

const words = ['Awesome!', 'Splendid!', 'Horrendous!', 'Excellent!', 'Great!'];

const randomWord = words[Math.floor(Math.random() * words.length)];

export const toasts = {
    info: (habitName, color) => {
        showMessage({
            duration: 4500,
            message: randomWord,
            description: `You completed ${habitName}. Keep it up!`,
            backgroundColor: color,
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
    error: (keyword, verb) => {
        showMessage({
            duration: 4000,
            message: `${keyword} successfully ${verb}`,
            backgroundColor: colors.error,
            titleStyle: {
                fontFamily: 'Medium',
                fontSize: 16,
            },
            floating: 'true',
            icon: 'info',
        });
    },
    note_edit: () => {
        showMessage({
            duration: 4000,
            message: `Note successfully edited.`,
            backgroundColor: colors.mainGreen,
            titleStyle: {
                fontFamily: 'Medium',
                fontSize: 16,
            },
            floating: 'true',
            icon: 'info',
        });
    },
};

export const fuckOffLinter = {};
