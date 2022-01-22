import { showMessage } from 'react-native-flash-message';
import { colors } from '../colors';

const words = ['Awesome!', 'Super!', 'Horrendous!', 'Excellent!', 'Great!'];

const randomWord = words[Math.floor(Math.random() * words.length)];

export const toasts = {
    info: (habitName) => {
        showMessage({
            duration: 4000,
            message: randomWord,
            description: `You completed ${habitName}. Nice work!`,
            backgroundColor: colors.black,
            titleStyle: {
                color: colors.mainGreen,
                fontFamily: 'Bold',
                fontSize: 17,
            },
            textStyle: {
                fontFamily: 'Medium',
                fontSize: 15,
            },
            style: { opacity: 0.7 },
            floating: 'true',
            icon: 'success',
        });
    },
    error: (keyword, verb) => {
        showMessage({
            duration: 4000,
            message: `${keyword} successfully ${verb}`,
            backgroundColor: colors.black,
            titleStyle: {
                color: colors.error,
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
