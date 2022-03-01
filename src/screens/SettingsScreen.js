import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { deleteNotifications, getAllNotifications } from '../utils/helpers/notification';
import { Box, Center, Flex, HStack, Text, useColorModeValue } from 'native-base';
import MainButton from '../components/uiComponents/Button';
import { FrequencySwitchContainer } from '../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import ListContainer from '../components/uiComponents/ListContainer';

const settingData = [
    {
        id: 0,
        name: 'Appearance',
    },
    {
        id: 1,
        name: 'Setting',
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
    const { setHabits, habits } = useHabits();
    const { navigate } = navigation;

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

    const renderSetting = (item) => (
        <SettingTouchable
            onPress={() =>
                navigate('SettingsDetailScreen', {
                    name: item.name,
                })
            }
        >
            <HStack>
                <Box p={1}>
                    <Text fontSize="md">{item.name}</Text>
                </Box>
            </HStack>
            <Ionicons name="chevron-forward" size={20} color="gray" />
        </SettingTouchable>
    );

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <ScrollView>
                <Box mt={40}>
                    <Box px={4}>
                        <Text fontSize="xs" marginLeft={4}>
                            PREFERENCES
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
                </Box>
                <Center justify="flex-end" mt={100}>
                    <TouchableOpacity onPress={() => displayDeleteAlert()}>
                        <Text fontWeight={700} color={colors.mainPurple} fontSize="xl">
                            Delete all data
                        </Text>
                    </TouchableOpacity>
                </Center>
            </ScrollView>
        </Flex>
    );
};

export default Settings;
