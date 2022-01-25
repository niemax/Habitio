import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { deleteNotifications } from '../utils/helpers/notification';
import { MainContainer } from '../utils/StyledComponents/Styled';
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
                        <Text marginTop="100px" color={colors.error} fontFamily="Extra" twentyTwo>
                            back
                        </Text>
                    </TouchableOpacity>
                    <Text marginTop="100px" color={colors.error} fontFamily="Extra" twentyTwo>
                        Delete all Data
                    </Text>
                    <TouchableOpacity onPress={toggleColorMode}>
                        <Text marginTop="100px" fontFamily="Extra" twentyTwo>
                            Toggle color mode
                        </Text>
                    </TouchableOpacity>
                </Box>
            </TouchableOpacity>
        </Box>
    );
};

export default Settings;
