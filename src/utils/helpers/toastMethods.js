import { showMessage } from 'react-native-flash-message';
import { colors } from '../colors';

const words = ['Awesome!', 'Splendid!', 'Horrendous!', 'Excellent!', 'Great!'];

const randomWord = words[Math.floor(Math.random() * words.length)];

export const toasts = {
    info: (habitName, color, setVisible) => {
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
            onPress: () => setVisible.current?.open(),
        });
    },
    error: (habitName) => {
        showMessage({
            duration: 4000,
            message: `${habitName} successfully removed`,
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
