import React from 'react';
import Text from '../../utils/Text';
import {
    ShowHabitActionsButton,
    ShowHabitActionsContainer,
} from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const ShowHabitActions = ({ actions: { displayDeleteAlert }, data }) => {
    const navigation = useNavigation();
    return (
        <ShowHabitActionsContainer>
            <ShowHabitActionsButton
                onPress={() =>
                    navigation.navigate('CalendarModal', {
                        data: data,
                    })
                }
            >
                <Text fontFamily="SemiBold" twenty>
                    Show Details
                </Text>
            </ShowHabitActionsButton>
            <TouchableOpacity onPress={displayDeleteAlert}>
                <Text color={colors.error} marginTop="25px" fontFamily="Bold" twenty>
                    Delete Habit
                </Text>
            </TouchableOpacity>
        </ShowHabitActionsContainer>
    );
};

export default ShowHabitActions;
