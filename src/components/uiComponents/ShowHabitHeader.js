import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { HomeheaderContainer } from '../../utils/StyledComponents/Styled';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/core';

export const ShowHabitHeader = ({ data }) => {
    const navigation = useNavigation();
    return (
        <HomeheaderContainer>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
                <Ionicons name="close-circle-sharp" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ShowHabitEditModal', {
                        data: data,
                    });
                }}
            >
                <Text nineteen marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                    Edit
                </Text>
            </TouchableOpacity>
        </HomeheaderContainer>
    );
};

export default ShowHabitHeader;
