import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HomeheaderContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/core';

export const ShowEditHeader = ({ handleUpdate }) => {
    const navigation = useNavigation();
    return (
        <HomeheaderContainer>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => navigation.goBack()}>
                <Ionicons name="close-circle-sharp" size={32} color="gray" />
            </TouchableOpacity>
            <Text twentyTwo fontFamily="Extra">
                Edit Habit
            </Text>
            <TouchableOpacity onPress={handleUpdate}>
                <Text marginRight="10px" nineteen color={colors.mainGreen}>
                    Save
                </Text>
            </TouchableOpacity>
        </HomeheaderContainer>
    );
};

export default ShowEditHeader;
