import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { deleteNotifications } from '../utils/helpers/notification';
import { Box, Center, Flex, HStack, Text, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import ListContainer from '../components/uiComponents/ListContainer';
import useSettings from '../hooks/useSettings';
import { useMoods } from '../context/MoodProvider';

const appMetaData = require('../../app.json');
const versionNumber = Object.values(appMetaData).map((item) => item.version)[0];

const settingData = [
    {
        id: 0,
        name: 'Appearance',
    },
    {
        id: 1,
        name: 'Theme',
    },
];

export const SettingTouchable = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-vertical: 4px;
`;

export const LineBreak = styled.View`
    border-bottom-color: gray;
    border-bottom-width: 0.4px;
    opacity: 0.4;
    margin-top: 5px;
`;

const Settings = ({ navigation }) => {
    const { setHabits } = useHabits();
    const { navigate } = navigation;

    const { colors, setColor } = useSettings();
    const { setMoods } = useMoods();

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
        setMoods([]);
        setColor('#FF4040');
        deleteNotifications();
    };

    const renderLineBreak = () => (
        <View
            style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.4,
                opacity: 0.4,
                marginTop: 5,
            }}
        />
    );

    const renderSetting = (item, wantToNavigate = true, color) => (
        <SettingTouchable
            onPress={() => {
                if (!!wantToNavigate) {
                    navigate('SettingsDetailScreen', {
                        name: item.name,
                    });
                }
                if (!wantToNavigate) {
                    displayDeleteAlert();
                }
            }}
        >
            <HStack>
                <Box p={1}>
                    <Text fontSize="md" color={color !== '' && color}>
                        {item.name}
                    </Text>
                </Box>
            </HStack>
            <Ionicons name="chevron-forward" size={20} color="gray" />
        </SettingTouchable>
    );

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Box mt={10}>
                    <Box px={4}>
                        <Text fontSize="xs" marginLeft={4}>
                            CUSTOMIZATION
                        </Text>
                        <ListContainer colorNumber={900}>
                            {settingData.map((item, index) => (
                                <Box key={item.id}>
                                    {renderSetting(item)}
                                    {index < settingData.length - 1 && renderLineBreak()}
                                </Box>
                            ))}
                        </ListContainer>
                    </Box>
                    <Box px={4} mt={4}>
                        <Text fontSize="xs" marginLeft={4}>
                            PRIVACY
                        </Text>
                        <ListContainer colorNumber={900}>
                            <Box>{renderSetting({ name: 'Privacy policy' })}</Box>
                            {renderLineBreak()}
                            <Box>
                                {renderSetting({ name: 'Delete all data' }, false, colors.error)}
                            </Box>
                        </ListContainer>
                    </Box>
                </Box>
                <Box px={4} mt={4}>
                    <Text fontSize="xs" marginLeft={4}>
                        FEEDBACK
                    </Text>
                    <ListContainer colorNumber={900}>
                        <Box>{renderSetting({ name: 'Send feedback' })}</Box>
                    </ListContainer>
                </Box>
                <Center justify="flex-end" mt={100}>
                    <Box mt={10}>
                        <Text fontSize="sm" color="grey">
                            Version {versionNumber}
                        </Text>
                    </Box>
                </Center>
            </ScrollView>
        </Flex>
    );
};

export default Settings;
