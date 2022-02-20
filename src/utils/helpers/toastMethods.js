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
            titleStyle: {
                fontSize: 17,
            },
            textStyle: {
                fontSize: 15,
            },
            style: {
                opacity: 0.94,
                backgroundColor: colors.mainPurple,
                borderRadius: 15,
            },
            icon: 'success',
            floating: true,
        });
    },
    error: (keyword, verb) => {
        showMessage({
            duration: 4000,
            message: `${keyword} successfully ${verb}`,
            titleStyle: {
                color: colors.error,
                fontSize: 16,
            },
            icon: 'info',
            floating: true,
            style: { opacity: 0.94 },
        });
    },
};
