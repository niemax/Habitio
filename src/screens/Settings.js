import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { deleteNotifications } from '../utils/helpers/notification';
import { MainContainer } from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

export default function Settings({ navigation }) {
    const { setHabits } = useHabits();
    return (
        <MainContainer>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                    AsyncStorage.clear();
                    setHabits([]);
                    deleteNotifications();
                }}
            >
                <Text marginTop="100px" color={colors.error} fontFamily="Extra" twentyTwo>
                    Delete all Data
                </Text>
            </TouchableOpacity>
        </MainContainer>
    );
}
