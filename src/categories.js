const data = [
    {
        category: 'Healthy',
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
                defaultTimes: 2,
                color: 'gray',
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
        ],
    },
    {
        category: 'Productivity',
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
                color: '#FF4040',
            },
            {
                name: 'Take a nap',
                habitIcon: 'sleep',
                color: '#818cf8',
                defaultTimes: 30,
                defaultUnit: 'minutes',
            },
            {
                name: `Set your most important tasks ${'\n'}for the day`,
                habitIcon: 'format-list-checks',
                color: '#FF4040',
            },
            {
                name: 'Clean your apartment',
                habitIcon: 'cleaning-services',
                color: '#722672',
            },
        ],
    },
    {
        category: 'Fitness',
        habits: [
            {
                name: 'Hit the gym',
                habitIcon: 'weight-lifter',
                color: '#2EB284',
            },
            {
                name: 'Go for a walk',
                habitIcon: 'walk',
                color: '#3F3FBF',
                defaultTimes: 30,
                defaultUnit: 'minutes',
            },
            {
                name: 'Do twenty pushups',
                habitIcon: 'arm-flex',
                color: '#4C7226',
                defaultTimes: 20,
                defaultUnit: 'push-ups',
            },
        ],
    },
    {
        category: 'Goals',
        mainIcon: require('./assets/flatIcons/goal.png'),
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
            {
                name: 'Ten thousand steps a day',
                habitIcon: 'foot-print',
                color: '#7FBF3F',
                defaultTimes: 100000,
                defaultUnit: 'steps',
            },
        ],
    },
    {
        category: 'Nutrition',
        habits: [
            {
                name: 'Eat breakfast',
                habitIcon: 'food-apple-outline',
                color: '#FF6347',
            },
            {
                name: 'Eat vegetables',
                habitIcon: 'carrot',
                color: '#FA9C0F',
            },
            {
                name: 'Eat 5 meals a day',
                habitIcon: 'food',
                color: '#722672',
                defaultTimes: 5,
                defaultUnit: 'meals',
            },
        ],
    },
    {
        category: 'Social',
        habits: [
            {
                name: 'Call a relative',
                habitIcon: 'phone',
                color: '#2EB284',
            },
            {
                name: 'Meet friends',
                habitIcon: 'account-group-outline',
                color: '#3FBFBF',
            },
        ],
    },
];

export default data;
