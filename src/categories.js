const data = [
    {
        category: 'Healthy',
        mainIcon: require('./assets/flatIcons/heart.png'),
        color: '#EA5B71',
        image: require('./assets/flatIcons/selfcare.png'),
        habits: [
            {
                name: 'Drink Water',
                habitIcon: 'water',
                color: '#0FCBFA',
                defaultTimes: 5,
                defaultUnit: 'glasses',
            },
            {
                name: 'Brush teeth',
                habitIcon: 'tooth-outline',
                color: 'gray',
                defaultTimes: 2,
            },
            {
                name: 'Go to bed early',
                habitIcon: 'bed',
                color: '#818cf8',
            },
            {
                name: 'Meditate',
                habitIcon: 'meditation',
                color: '#EA5B71',
                defaultTimes: 10,
                defaultUnit: 'minutes',
            },
            {
                name: 'Eat vegetables',
                habitIcon: 'carrot',
                color: '#FA9C0F',
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
                habitIcon: 'book-variant-multiple',
                color: '#FA9C0F',
                defaultTimes: 20,
                defaultUnit: 'pages',
            },
            {
                name: 'Take a cold shower',
                habitIcon: 'shower-head',
                color: '#0F84FA',
            },
            {
                name: 'Avoid social media',
                habitIcon: 'facebook',
                color: '#0F84FA',
                defaultTimes: 4,
                defaultUnit: 'hours',
                defaultGoal: 'Break a habit',
            },
            {
                name: 'Make your bed',
                habitIcon: 'bed-king',
                description: 'It is a good start to a productive day',
                color: '#FF4040',
            },
        ],
    },
    {
        category: 'Fitness',
        mainIcon: require('./assets/flatIcons/flexions-exercise.png'),
        color: '#2EB284',
        image: require('./assets/flatIcons/dumbbell.png'),
        habits: [
            {
                name: 'Hit the gym',
                habitIcon: 'weight-lifter',
                description: 'Build muscle',
                color: '#2EB284',
            },
            {
                name: 'Go for a walk',
                habitIcon: 'walk',
                description: 'Wander around your neighborhood',
                color: '#2EB284',
                defaultTimes: 30,
                defaultUnit: 'minutes',
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
                habitIcon: 'notebook',
                description: 'Write down your accomplishments,\nexperiences, and goals',
                color: '#FA9C0F',
            },
            {
                name: 'Learn a new instrument',
                habitIcon: 'guitar-acoustic',
                color: '#818cf8',
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
                habitIcon: 'food-apple-outline',
                description: 'Start the day right with the most\nimportant meal of the day',
                color: '#FF6347',
            },
        ],
    },
];

export default data;
