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
    infoAdditional: (habitName, completedCount, color, setVisible) => {
        showMessage({
            duration: 3500,
            message: randomWord,
            description: `You have completed ${habitName} now ${completedCount} times. Keep it up!`,
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
            onPress: () => setVisible.current?.open(),
        });
    },
    error: () => {
        showMessage({
            duration: 4000,
            message: `Habit successfully removed`,
            backgroundColor: colors.error, // background color
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
