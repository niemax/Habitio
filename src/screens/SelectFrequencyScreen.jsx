import { Box, Center, Flex, HStack, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ListContainer from '../components/uiComponents/ListContainer';
import MainContainer from '../components/uiComponents/MainContainer';
import useSettings from '../hooks/useSettings';
import { LineBreak, SettingTouchable } from './SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const weekdays = [
    {
        id: 0,
        name: 'mon',
    },
    {
        id: 1,
        name: 'tue',
    },
    {
        id: 2,
        name: 'wed',
    },
    {
        id: 3,
        name: 'thu',
    },
    {
        id: 4,
        name: 'fri',
    },
    {
        id: 5,
        name: 'sat',
    },
    {
        id: 6,
        name: 'sun',
    },
];

const SelectFrequencyScreen = ({ route }) => {
    const {
        handleChange,
        routeWeekdays,
        handleWeekdays,
        frequency,
        name,
        routeHabitNature,
        handleHabitNature,
    } = route?.params;
    const [showExtra, setShowExtra] = useState(frequency === 'daily');
    const [selectedWeekdays, setSelectedWeekdays] = useState(routeWeekdays);
    const [habitNature, setHabitNature] = useState(routeHabitNature);
    const [stateFrequency, setStateFrequency] = useState(frequency);

    const { colors } = useSettings();

    const handleWeekdayChange = (name) => {
        if (!selectedWeekdays?.includes(name)) {
            setSelectedWeekdays([...selectedWeekdays, name]);
        } else {
            const filtered = selectedWeekdays?.filter((weekday) => weekday !== name);
            setSelectedWeekdays(filtered);
        }
    };

    useEffect(() => {
        if (name === 'habit nature') {
            handleHabitNature(habitNature);
        }
    }, [habitNature]);

    useEffect(() => {
        if (name === 'select frequency') handleWeekdays(selectedWeekdays);
    }, [selectedWeekdays]);

    if (name === 'habit nature')
        return (
            <MainContainer>
                <Box px={2} mt={10}>
                    <Text px={3} opacity={0.7} fontSize="xs">
                        I WANT TO
                    </Text>
                    <ListContainer py={2}>
                        <SettingTouchable
                            style={{ paddingVertical: 8 }}
                            onPress={() => setHabitNature('Build a habit')}
                        >
                            <Text fontSize="md">Build a habit</Text>
                        </SettingTouchable>
                        <LineBreak />
                        <SettingTouchable
                            style={{ paddingVertical: 8 }}
                            onPress={() => setHabitNature('Break a habit')}
                        >
                            <Text fontSize="md">Break a habit</Text>
                        </SettingTouchable>
                    </ListContainer>
                </Box>
            </MainContainer>
        );

    return (
        <MainContainer>
            <Box px={2} mt={10}>
                <Text px={3} opacity={0.7} fontSize="xs">
                    HOW OFTEN?
                </Text>
                <ListContainer py={2}>
                    <SettingTouchable
                        style={{ paddingVertical: 8 }}
                        onPress={() => {
                            handleChange('daily');
                            setShowExtra(true);
                            setStateFrequency('daily');
                        }}
                    >
                        <Text fontSize="md">Daily</Text>
                        {stateFrequency === 'daily' && (
                            <Ionicons name="checkmark" size={20} color={colors.mainColor} />
                        )}
                    </SettingTouchable>
                    <LineBreak />
                    <SettingTouchable
                        style={{ paddingVertical: 8 }}
                        onPress={() => {
                            handleChange('weekly');
                            setSelectedWeekdays([]);
                            setShowExtra(false);
                            setStateFrequency('weekly');
                        }}
                    >
                        <Text fontSize="md">Weekly</Text>
                        {stateFrequency === 'weekly' && (
                            <Ionicons name="checkmark" size={20} color={colors.mainColor} />
                        )}
                    </SettingTouchable>
                    <LineBreak />
                    <SettingTouchable
                        style={{ paddingVertical: 8 }}
                        onPress={() => {
                            handleChange('monthly');
                            setSelectedWeekdays([]);
                            setShowExtra(false);
                            setStateFrequency('monthly');
                        }}
                    >
                        <Text fontSize="md">Monthly</Text>
                        {stateFrequency === 'monthly' && (
                            <Ionicons name="checkmark" size={20} color={colors.mainColor} />
                        )}
                    </SettingTouchable>
                </ListContainer>
                {!!showExtra && (
                    <Box mt={4}>
                        <Text px={3} opacity={0.7} fontSize="xs">
                            WHICH DAYS?
                        </Text>
                        <ListContainer rounded="md">
                            <Flex direction="row" justify="space-evenly">
                                <HStack p={2} space={6}>
                                    {weekdays.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => handleWeekdayChange(item.name, item.id)}
                                        >
                                            <Flex align="center" justify="center">
                                                {selectedWeekdays?.includes(item.name) ? (
                                                    <Center
                                                        rounded="full"
                                                        bg={
                                                            selectedWeekdays?.includes(item.name)
                                                                ? colors.mainColor
                                                                : 'transparent'
                                                        }
                                                        w={6}
                                                        h={6}
                                                    >
                                                        <Ionicons
                                                            name="checkmark"
                                                            size={18}
                                                            color="white"
                                                        />
                                                    </Center>
                                                ) : (
                                                    <View
                                                        style={{
                                                            height: 24,
                                                            width: 24,
                                                            borderWidth: 1,
                                                            borderRadius: '100%',
                                                            borderColor: 'gray',
                                                            opacity: 0.3,
                                                        }}
                                                    />
                                                )}

                                                <Text>{item.name}</Text>
                                            </Flex>
                                        </TouchableOpacity>
                                    ))}
                                </HStack>
                            </Flex>
                        </ListContainer>
                    </Box>
                )}
            </Box>
        </MainContainer>
    );
};

export default SelectFrequencyScreen;
