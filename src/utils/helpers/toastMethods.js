import { showMessage } from 'react-native-flash-message';

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
                opacity: 0.87,
                backgroundColor: '#040404',
            },
            icon: 'success',
        });
    },
    error: (keyword, verb) => {
        showMessage({
            duration: 4000,
            message: `${keyword} successfully ${verb}`,
            titleStyle: {
                fontSize: 16,
            },
            icon: 'info',
            style: {
                opacity: 0.87,
                backgroundColor: '#040404',
            },
        });
    },
};
