import React, { useEffect, useState } from 'react';
import { Box, Text, useColorMode } from 'native-base';
import ListContainer from '../components/uiComponents/ListContainer';
import MainContainer from '../components/uiComponents/MainContainer';
import { LineBreak, SettingTouchable } from './SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components';
import useSettings from '../hooks/useSettings';

const ColorPalletteView = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

const ColorTouchable = styled.TouchableOpacity`
    margin: 10px;
    width: 30px;
    height: 30px;
    border-radius: 100px;
`;

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
            console.error(e);
        }
    },
};

const SettingsDetailScreen = ({ route }) => {
    const { name } = route.params;

    const [selection, setSelection] = useState('');
    const { toggleColorMode } = useColorMode();

    const { colors, habitSelectionColors } = useSettings();

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
                                <Ionicons name="checkmark" size={20} color={colors.mainColor} />
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
                                <Ionicons name="checkmark" size={20} color={colors.mainColor} />
                            )}
                        </SettingTouchable>
                        <LineBreak />
                        <SettingTouchable onPress={() => setSelection('system')}>
                            <Box p={1}>
                                <Text fontSize="md">System</Text>
                            </Box>
                            {selection === 'system' && (
                                <Ionicons name="checkmark" size={20} color={colors.mainColor} />
                            )}
                        </SettingTouchable>
                    </ListContainer>
                </Box>
            </MainContainer>
        );

    const setAppColor = async (color) => {
        try {
            await AsyncStorage.setItem('@app-color', color);
        } catch (error) {
            console.error(error);
        }
    };

    if (name === 'Theme')
        return (
            <MainContainer>
                <Box mt={40} px={4}>
                    <Text fontSize="xs">CHOOSE YOUR PREFERRED THEME COLOR</Text>
                    <ColorPalletteView>
                        {habitSelectionColors.map((item, index) => (
                            <ColorTouchable
                                key={index.toString()}
                                onPress={() => setAppColor(item)}
                                style={{ backgroundColor: item }}
                            />
                        ))}
                    </ColorPalletteView>
                    <Box mt={4}>
                        <Text fontSize="xs">
                            <Text fontWeight={700}>Note</Text>: in order for changes to fully take
                            place, you need to restart the app
                        </Text>
                    </Box>
                </Box>
            </MainContainer>
        );

    if (name === 'Privacy policy')
        return (
            <MainContainer>
                <Box mt={40} px={4}>
                    <Text fontSize="md">
                        The app doesn't track the user in any way. The app works fully in offline
                        mode, which means that the app only stores data on the device. If you wish
                        to delete all data from your device, please use the "Delete all data"
                        -option.
                    </Text>
                    <Box mt={8}>
                        <Text fontSize="md" fontWeight={500}>
                            If you have any further questions regarding the privacy policy, please
                            contact the developer for more information.
                        </Text>
                    </Box>
                </Box>
            </MainContainer>
        );

    if (name === 'Send feedback')
        return (
            <MainContainer>
                <Box mt={40} px={4}>
                    <Text fontSize="md">
                        Any feedback is greatly appreciated and can be sent to axel.nieminen@mac.com
                    </Text>
                </Box>
            </MainContainer>
        );
};

export default SettingsDetailScreen;
