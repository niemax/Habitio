import React from 'react';
import { Feather, IonIcons } from '@expo/vector-icons';

const data = [
    {
        name: 'Wellbeing',
        mainIcon: 'heart',
        image: require('./assets/flatIcons/healthcare.png'),
        habits: [
            {
                name: 'Drink Water',
                habitIcon: require('./assets/flatIcons/water-drop.png'),
                description: 'Keep your energy levels up',
            },
            {
                name: 'Hit the gym',
                habitIcon: require('./assets/flatIcons/exercises.png'),
                description: 'Get Stronger',
            },
            {
                name: 'Get enough sleep',
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
    /*  {
        name: 'Fitness',
       habits: [
            {
                name: 'Hit the gym',
                icon: require('./assets/flatIcons/exercises.png'),
            },
        ], 
        icon: <Feather name="activity" size={40} color="#467CFB" style={{ marginLeft: 20 }} />,
    }, */
];

export default data;
