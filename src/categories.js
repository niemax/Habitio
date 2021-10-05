import { colors } from './utils/colors';

const data = [
    {
        name: 'Wellbeing',
        mainIcon: 'heart',
        color: colors.error,
        image: require('./assets/flatIcons/healthcare.png'),
        habits: [
            {
                name: 'Drink Water',
                habitIcon: require('./assets/flatIcons/water.png'),
                description: 'Keep your energy levels up',
            },
            {
                name: 'Hit the gym',
                habitIcon: require('./assets/flatIcons/exercises.png'),
                description: 'Get Stronger',
            },
            {
                name: 'Go to bed earlier than normal',
                habitIcon: require('./assets/flatIcons/enough-sleep.png'),
                description: 'Be more energetic',
            },
            {
                name: 'Meditate',
                habitIcon: require('./assets/flatIcons/meditation.png'),
                description: 'Take a moment for yourself to think',
            },
        ],
    },
    {
        name: 'Productivity',
        mainIcon: 'book-open',
        color: '#EBDBB1',
        image: require('./assets/flatIcons/time-to-market.png'),
        habits: [
            {
                name: 'Read a book',
                habitIcon: require('./assets/flatIcons/storytelling.png'),
                description: 'Turn up your interest',
            },
            {
                name: 'Take a cold shower',
                habitIcon: require('./assets/flatIcons/shower.png'),
                description: 'Benefits yours metabolism and\ncirculation',
            },
        ],
    },
];

export default data;
