import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { deleteNotifications } from '../utils/helpers/notification';
import { Box, Center, Text } from 'native-base';
import { MainContainer } from '../utils/StyledComponents/Styled';
import MainButton from '../components/uiComponents/Button';

const Settings = ({ navigation }) => {
    const { setHabits } = useHabits();
    return (
        <MainContainer>
            <Center mt={40}>
                <MainButton
                    onPress={() => {
                        navigation.goBack();
                        AsyncStorage.clear();
                        setHabits([]);
                        deleteNotifications();
                    }}
                >
                    Delete all data
                </MainButton>
            </Center>
        </MainContainer>
    );
};

export default Settings;
