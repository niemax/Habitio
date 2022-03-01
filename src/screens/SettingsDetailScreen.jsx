import React, { useEffect, useState, useMemo } from 'react';
import { Box, Center, HStack, Text, useColorMode } from 'native-base';
import ListContainer from '../components/uiComponents/ListContainer';
import MainContainer from '../components/uiComponents/MainContainer';
import { LineBreak, SettingTouchable } from './SettingsScreen';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { Appearance, AsyncStorage } from 'react-native';

export const colorModeManager = {
    get: async () => {
        try {
            let val = await AsyncStorage.getItem('@color-mode');
            return val;
        } catch (e) {
            return 'light';
        }
    },
    set: async (value) => {
        try {
            await AsyncStorage.setItem('@color-mode', value);
        } catch (e) {
            console.log(e);
        }
    },
};

const SettingsDetailScreen = ({ route }) => {
    const { name } = route.params;

    const [selection, setSelection] = useState('');
    const { toggleColorMode } = useColorMode();

    useEffect(async () => {
        await colorModeManager.get().then((val) => {
            if (!val) {
                setSelection('system');
            } else {
                setSelection(val);
            }
        });
    }, []);

    useEffect(() => {
        setColorMode();
    }, [selection]);

    const setColorMode = async () => {
        switch (selection) {
            case 'dark':
                return await colorModeManager.set('dark');
            case 'light':
                return await colorModeManager.set('light');
            case 'system':
                return await colorModeManager.set('');
            default:
                return;
        }
    };

    if (name === 'Appearance')
        return (
            <MainContainer>
                <Box mt={40} px={4}>
                    <ListContainer py={1}>
                        <SettingTouchable
                            onPress={() => {
                                setSelection('dark');
                                selection !== 'dark' && toggleColorMode();
                            }}
                        >
                            <Box p={1}>
                                <Text fontSize="md">Dark</Text>
                            </Box>
                            {selection === 'dark' && (
                                <Ionicons name="checkmark" size={20} color={colors.mainPurple} />
                            )}
                        </SettingTouchable>
                        <LineBreak />
                        <SettingTouchable
                            onPress={() => {
                                setSelection('light');
                                selection !== 'light' && toggleColorMode();
                            }}
                        >
                            <Box p={1}>
                                <Text fontSize="md">Light</Text>
                            </Box>
                            {selection === 'light' && (
                                <Ionicons name="checkmark" size={20} color={colors.mainPurple} />
                            )}
                        </SettingTouchable>
                        <LineBreak />
                        <SettingTouchable onPress={() => setSelection('system')}>
                            <Box p={1}>
                                <Text fontSize="md">System</Text>
                            </Box>
                            {selection === 'system' && (
                                <Ionicons name="checkmark" size={20} color={colors.mainPurple} />
                            )}
                        </SettingTouchable>
                    </ListContainer>
                </Box>
            </MainContainer>
        );
};

export default SettingsDetailScreen;
