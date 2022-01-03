import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useHabits } from '../../context/HabitProvider';
import handleDoneToday from '../../utils/helpers/handleDone';

export default function DoneCheckBox({ item }) {
    const { habitSetter, habits } = useHabits();
    const { color, completed } = item;
    const data = item;

    return (
        <BouncyCheckbox
            size={30}
            fillColor={color}
            unfillColor="#192429"
            iconStyle={{ borderColor: '#404040', borderRadius: 10 }}
            bounceFriction={2}
            isChecked={completed}
            onPress={() => handleDoneToday(data, habits, habitSetter)}
        />
    );
}
