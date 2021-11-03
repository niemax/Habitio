import React from 'react';
import Text from '../../utils/Text';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { colors } from '../../utils/colors';
import { CreateHabitHeader } from '../../utils/StyledComponents/Styled';
import handleHabitCreation from '../../utils/helpers/createhabitHelpers';
import { useHabits } from '../../context/HabitProvider';

export default function CHHeader({
    newHabit,
    isEnabledDate,
    isEnabledSpecific,
    reminderTime,
    habitName,
    specificDate,
}) {
    const { CRUDHabits } = useHabits();
    const navigation = useNavigation();
    return (
        <CreateHabitHeader>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
            <Text twentyTwo fontFamily="Extra">
                Create Habit
            </Text>
            <TouchableOpacity
                onPress={() =>
                    handleHabitCreation(
                        newHabit,
                        isEnabledDate,
                        isEnabledSpecific,
                        CRUDHabits,
                        reminderTime,
                        habitName,
                        navigation,
                        specificDate
                    )
                }
            >
                <Text color={colors.mainGreen} marginRight="10px">
                    Create
                </Text>
            </TouchableOpacity>
        </CreateHabitHeader>
    );
}
