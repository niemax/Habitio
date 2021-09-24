import React from 'react';
import { Feather } from '@expo/vector-icons';

const data = [
    {
        name: 'Wellbeing',
        icon: <Feather name="heart" size={40} color="#FB467C" style={{ marginLeft: 20 }} />,
        image: require('./assets/flatIcons/healthcare.png'),
    },
    {
        name: 'Fitness',
        icon: <Feather name="activity" size={40} color="#467CFB" style={{ marginLeft: 20 }} />,
    },
];

export default data;
