import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HomeheaderContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

export const ShowEditHeader = ({ setEditHabitModalVisible, handleSubmit }) => (
    <HomeheaderContainer>
        <TouchableOpacity
            style={{ marginLeft: 5, marginTop: 10 }}
            onPress={() => setEditHabitModalVisible(false)}
        >
            <Ionicons name="close-circle-sharp" size={34} color="gray" />
        </TouchableOpacity>
        <Text twentyTwo fontFamily="Extra">
            Edit Habit
        </Text>
        <TouchableOpacity onPress={handleSubmit}>
            <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                <Text color={colors.mainGreen}>Update</Text>
            </Text>
        </TouchableOpacity>
    </HomeheaderContainer>
);

export default ShowEditHeader;
