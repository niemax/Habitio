import React from 'react';
import { useHabits } from '../../context/HabitProvider';
import handleDoneToday from '../../utils/helpers/handleDone';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function DoneCheckBox({ item, completedDay }) {
    const { habitSetter, habits } = useHabits();
    return (
        <BouncyCheckbox
            size={32}
            fillColor={item.color}
            unfillColor="transparent"
            iconStyle={{ borderColor: 'gray', borderRadius: 10 }}
            bounceFriction={2}
            onPress={() => handleDoneToday(item, habits, completedDay, habitSetter)}
        />
    );
}
