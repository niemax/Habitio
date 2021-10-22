import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { HomeheaderContainer } from '../../utils/StyledComponents/Styled';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';

export const ShowHabitHeader = ({ setModalVisible, setEditHabitModalVisible }) => (
    <HomeheaderContainer>
        <TouchableOpacity
            style={{ marginLeft: 10, marginTop: 10 }}
            onPress={() => setModalVisible(false)}
        >
            <Ionicons name="close-circle-sharp" size={34} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                setEditHabitModalVisible(true);
            }}
        >
            <Text twenty marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                Edit
            </Text>
        </TouchableOpacity>
    </HomeheaderContainer>
);

export default ShowHabitHeader;
