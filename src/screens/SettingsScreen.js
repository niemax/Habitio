import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { deleteNotifications } from '../utils/helpers/notification';
import Text from '../utils/Text';
import { Box, useColorMode, useColorModeValue } from 'native-base';

const Settings = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const { setHabits } = useHabits();
    return (
        <Box flex={1}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                    AsyncStorage.clear();
                    setHabits([]);
                    deleteNotifications();
                }}
            >
                <Box mt={10}>
                    <TouchableOpacity onPress={navigation.goBack()}>
                        <Text marginTop="100px" color={colors.error}>
                            back
                        </Text>
                    </TouchableOpacity>
                    <Text marginTop="100px" color={colors.error}>
                        Delete all Data
                    </Text>
                    <TouchableOpacity onPress={toggleColorMode}>
                        <Text marginTop="100px">Toggle color mode</Text>
                    </TouchableOpacity>
                </Box>
            </TouchableOpacity>
        </Box>
    );
};

export default Settings;
