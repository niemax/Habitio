import { colors } from './utils/colors';

const data = [
    {
        category: 'Self-Care',
        mainIcon: require('./assets/flatIcons/heart.png'),
        color: colors.error,
        image: require('./assets/flatIcons/selfcare.png'),
        habits: [
            {
                name: 'Drink Water',
                habitIcon: require('./assets/flatIcons/drop.png'),
                description: 'Stay hydrated throughout the day',
                color: '#0FCBFA',
            },

            {
                name: 'Go to bed earlier than normal',
                habitIcon: require('./assets/flatIcons/sleeping.png'),
                description: 'Wake up earlier and get to work while\nothers are sleeping',
                color: '#3F3FBF',
            },
            {
                name: 'Meditate',
                habitIcon: require('./assets/flatIcons/lotus.png'),
                description: 'Take a moment for yourself to think',
                color: '#EA5B71',
            },
            {
                name: 'Take Meds',
                habitIcon: require('./assets/flatIcons/drugs.png'),
                description: 'Do not neglect taking your meds',
                color: '#E2FA0F',
            },
        ],
    },
    {
        category: 'Productivity',
        mainIcon: require('./assets/flatIcons/timetomarket.png'),
        color: '#EBDBB1',
        image: require('./assets/flatIcons/time-to-market.png'),
        habits: [
            {
                name: 'Read a book',
                habitIcon: require('./assets/flatIcons/storytelling.png'),
                description: 'Relax and learn something new\nand interesting',
                color: '#FA9C0F',
            },
            {
                name: 'Take a cold shower',
                habitIcon: require('./assets/flatIcons/shower.png'),
                description: 'Benefits yours metabolism and\ncirculation',
                color: '#0F84FA',
            },
            {
                name: 'Avoid social media',
                habitIcon: require('./assets/flatIcons/social-media.png'),
                description: 'Retain from social media platforms\nfor a moment',
                color: '#7D6C06',
            },
            {
                name: 'Make your bed',
                habitIcon: require('./assets/flatIcons/bed.png'),
                description: 'It is a good start to a productive day',
                color: '#FF4040',
            },
        ],
    },
    {
        category: 'Fitness',
        mainIcon: require('./assets/flatIcons/flexions-exercise.png'),
        color: colors.mainGreen,
        image: require('./assets/flatIcons/dumbbell.png'),
        habits: [
            {
                name: 'Hit the gym',
                habitIcon: require('./assets/flatIcons/treadmill.png'),
                description: 'Get Stronger',
                color: '#2EB284',
            },
            {
                name: 'Go for a walk',
                habitIcon: require('./assets/flatIcons/person-walking.png'),
                description: 'Clear your mind and sharpen your cardiovascular side',
                color: '#2EB284',
            },
        ],
    },
    {
        category: 'Goals',
        mainIcon: require('./assets/flatIcons/goal.png'),
        color: '#EBDBB1',
        image: require('./assets/flatIcons/career.png'),
        habits: [
            {
                name: 'Journal',
                habitIcon: require('./assets/flatIcons/travel-journal.png'),
                description: 'Write down your accomplishments,\nexperiences, and goals',
                color: '#FA9C0F',
            },
        ],
    },
    {
        category: 'Nutrition',
        mainIcon: require('./assets/flatIcons/dinner.png'),
        color: '#764D00',
        image: require('./assets/flatIcons/nutrition.png'),
        habits: [
            {
                name: 'Eat Breakfast',
                habitIcon: require('./assets/flatIcons/coffee.png'),
                description: 'Start the day right with the most\nimportant meal of the day',
                color: '#FF6347',
            },
        ],
    },
];

export default data;
