import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, TouchableOpacity } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { deleteNotifications, getAllNotifications } from '../utils/helpers/notification';
import { Box, Center, Flex, Text, useColorModeValue } from 'native-base';
import MainButton from '../components/uiComponents/Button';

const Settings = ({ navigation }) => {
    const { setHabits, habits } = useHabits();

    const allNotifications = getAllNotifications().length;

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete data',
            'Deleting all data means deleting all habits and notifications. Are you sure you want to proceed? Action is irreversible.',
            [
                {
                    text: 'OK',
                    onPress: () => clearAllData(),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const clearAllData = () => {
        navigation.goBack();
        AsyncStorage.clear();
        setHabits([]);
        deleteNotifications();
    };

    return (
        <Center flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <Box mt={20}>
                <Box>
                    <Text fontSize="xl">More settings coming soon.</Text>
                </Box>
                <Center justify="flex-end" flex={1}>
                    <MainButton onPress={() => !!habits.length && displayDeleteAlert()}>
                        Delete all data
                    </MainButton>
                </Center>
            </Box>
        </Center>
    );
};

export default Settings;
