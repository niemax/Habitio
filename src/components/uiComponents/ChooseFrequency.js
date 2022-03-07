import React from 'react';
import { View, Switch, TextInput, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    DateTimePickerView,
    FrequencySwitchContainer,
    HabitUtilityInfoContainer,
    LineBreak,
} from '../../utils/StyledComponents/Styled';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Box, Flex, Button, Text, useColorMode, KeyboardAvoidingView, HStack } from 'native-base';
import useSettings from '../../hooks/useSettings';
import { useNavigation } from '@react-navigation/native';
import ListContainer from './ListContainer';
import { SettingTouchable } from '../../screens/SettingsScreen';

export default function Frequency({
    switchStates: { isEnabled, isEnabledDate, isEnabledSpecific, isEnabledEndDate },
    methods: {
        onChangeSpecific,
        onChangeReminderTime,
        onChangeEndDate,
        toggleSwitchSpecific,
        toggleSwitch,
        toggleSwitchDate,
        toggleSwitchEndDate,
    },
    setters: { setSelectedValue, setTimesCount, setSelectedFrequency, setWeekdays, setHabitNature },
    values: { specificDate, reminderTime, endDate, habitReminderTime },
    states: {
        timesCount,
        habitSpecificDate,
        habitEndDate,
        selectedValue,
        selectedFrequency,
        weekdays,
        habitNature,
    },
}) {
    const { colorMode } = useColorMode();

    const { navigate } = useNavigation();
    const { colors } = useSettings();

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

    const isSelectedWeekly = selectedFrequency === 'weekly';

    const handleWeekdays = (weekdays) => setWeekdays(weekdays);

    const handleHabitNature = (nature) => setHabitNature(nature);

    const handleFrequencySelection = (frequency) => {
        setSelectedFrequency(frequency);
    };

    const renderHowOftenContainer = () =>
        isEnabled && (
            <Box py={2}>
                <ListContainer rounded="xl" py={2}>
                    <SettingTouchable
                        style={{ marginTop: 5 }}
                        onPress={() =>
                            navigate('SelectFrequencyScreen', {
                                handleHabitNature: handleHabitNature,
                                name: 'habit nature',
                                routeHabitNature: habitNature,
                                handleChange: handleFrequencySelection,
                                handleWeekdays: handleWeekdays,
                                routeWeekdays: weekdays,
                                frequency: selectedFrequency,
                            })
                        }
                    >
                        <>
                            <Text fontSize="md">I want to</Text>
                        </>
                        <HStack>
                            <Text>{habitNature}</Text>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </HStack>
                    </SettingTouchable>
                    {renderLineBreak()}
                    <SettingTouchable
                        style={{ marginTop: 10, marginBottom: 5 }}
                        onPress={() =>
                            navigate('SelectFrequencyScreen', {
                                name: 'select frequency',
                                handleChange: handleFrequencySelection,
                                handleWeekdays: handleWeekdays,
                                routeWeekdays: weekdays,
                                frequency: selectedFrequency,
                                handleHabitNature: handleHabitNature,
                            })
                        }
                    >
                        <>
                            <Text fontSize="md">How often?</Text>
                        </>
                        <HStack>
                            <Text>
                                {!weekdays.length
                                    ? selectedFrequency
                                    : weekdays?.map((weekday) => weekday).join(', ')}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </HStack>
                    </SettingTouchable>
                </ListContainer>
            </Box>
        );

    const renderCompleteOnce = () => (
        <>
            <FrequencySwitchContainer>
                <Text fontSize="md">Complete once</Text>
                <Switch onValueChange={toggleSwitchSpecific} value={isEnabledSpecific} />
            </FrequencySwitchContainer>
            <DateTimePickerView>
                {isEnabledSpecific && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={specificDate || habitSpecificDate}
                        mode="datetime"
                        is24Hour="true"
                        style={{ width: '100%' }}
                        themeVariant={colorMode === 'light' ? 'light' : 'dark'}
                        onChange={onChangeSpecific}
                    />
                )}
            </DateTimePickerView>
        </>
    );

    const renderEndDate = () => (
        <HabitUtilityInfoContainer>
            <Box mt={2}>
                <Text fontSize="xs" marginLeft="15px" mb={2} opacity={0.7}>
                    SET AN END DATE
                </Text>
                <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} px={4} py={1} rounded="xl">
                    <FrequencySwitchContainer>
                        <Text fontSize="md">End date</Text>
                        <Switch onValueChange={toggleSwitchEndDate} value={isEnabledEndDate} />
                    </FrequencySwitchContainer>
                    {isEnabledEndDate && (
                        <DateTimePickerView>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={endDate || habitEndDate}
                                mode="datetime"
                                themeVariant={colorMode === 'light' ? 'light' : 'dark'}
                                is24Hour="true"
                                onChange={onChangeEndDate}
                                display="default"
                            />
                        </DateTimePickerView>
                    )}
                </Box>
            </Box>
        </HabitUtilityInfoContainer>
    );

    const renderVerticalLineBreak = () => (
        <View
            style={{
                height: 20,
                width: 0.5,
                backgroundColor: 'black',
                opacity: 0.3,
            }}
        />
    );

    const renderGoalIfEnabled = () =>
        isEnabled && (
            <Box mt={4}>
                <Text fontSize="xs" marginLeft="15px" opacity={0.7}>
                    {`${selectedFrequency?.toUpperCase()} ${
                        habitNature === 'Build a habit' ? 'GOAL' : 'MAXIMUM'
                    }`}
                </Text>
                <HabitUtilityInfoContainer>
                    <Box
                        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                        px={3}
                        py={3}
                        rounded="xl"
                    >
                        <SafeAreaView>
                            <Flex
                                rounded="md"
                                direction="row"
                                align="center"
                                justify="space-between"
                            >
                                <Flex direction="row" align="center">
                                    <Text fontSize="md">{timesCount}</Text>
                                </Flex>
                                <Flex
                                    direction="row"
                                    bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                                    rounded="lg"
                                    align="center"
                                    justify="center"
                                    px={1}
                                >
                                    <Button
                                        _pressed={{ background: 'transparent' }}
                                        bg="transparent"
                                        size={8}
                                        onPress={() => {
                                            if (timesCount > 1) {
                                                setTimesCount(timesCount - 1);
                                            }
                                        }}
                                    >
                                        <Feather
                                            name="minus"
                                            size={22}
                                            color={colorMode === 'light' ? 'black' : 'white'}
                                        />
                                    </Button>
                                    {renderVerticalLineBreak()}
                                    <Button
                                        bg="transparent"
                                        _pressed={{ background: 'transparent' }}
                                        size={8}
                                        onPress={() => setTimesCount(timesCount + 1)}
                                    >
                                        <Ionicons
                                            name="add-sharp"
                                            size={22}
                                            color={colorMode === 'light' ? 'black' : 'white'}
                                        />
                                    </Button>
                                </Flex>
                            </Flex>
                        </SafeAreaView>
                        {renderLineBreak()}
                        <Box mt={3}>
                            <TextInput
                                clearButtonMode="always"
                                placeholder="Unit (e.g. minutes, times, pages)"
                                width="100%"
                                value={selectedValue}
                                style={{
                                    fontSize: 16,
                                    color: colors.mainColor,
                                }}
                                placeholderTextColor="gray"
                                onChangeText={(text) => setSelectedValue(text)}
                            />
                        </Box>
                    </Box>
                </HabitUtilityInfoContainer>
            </Box>
        );

    const renderReminder = () =>
        isSelectedWeekly && (
            <HabitUtilityInfoContainer>
                <Box mt={2}>
                    <Text fontSize="xs" marginLeft="15px" mb={2} opacity={0.7}>
                        SET A REMINDER
                    </Text>
                    <Box
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        px={4}
                        py={1}
                        rounded="xl"
                    >
                        <FrequencySwitchContainer>
                            <Text fontSize="md">Reminder</Text>
                            <Switch onValueChange={toggleSwitchDate} value={isEnabledDate} />
                        </FrequencySwitchContainer>
                        {isEnabledDate && (
                            <DateTimePickerView>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={reminderTime || habitReminderTime}
                                    mode="time"
                                    themeVariant={colorMode === 'light' ? 'light' : 'dark'}
                                    is24Hour="true"
                                    onChange={onChangeReminderTime}
                                    display="default"
                                />
                            </DateTimePickerView>
                        )}
                    </Box>
                </Box>
            </HabitUtilityInfoContainer>
        );

    return (
        <KeyboardAvoidingView behavior="padding">
            <SafeAreaView>
                <Flex mt={4} px={0.5}>
                    <Box>
                        <Text fontSize="xs" marginLeft="15px" opacity={0.7}>
                            FREQUENCY
                        </Text>
                    </Box>
                    <HabitUtilityInfoContainer>
                        <Box
                            bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                            px={3}
                            py={3}
                            rounded="xl"
                        >
                            {renderCompleteOnce()}
                            {renderLineBreak()}
                            <FrequencySwitchContainer>
                                <Text fontSize="md">Goal</Text>
                                <Switch onValueChange={toggleSwitch} value={isEnabled} />
                            </FrequencySwitchContainer>
                        </Box>
                    </HabitUtilityInfoContainer>
                    {renderHowOftenContainer()}
                    {renderGoalIfEnabled()}
                    {renderEndDate()}
                    {renderReminder()}
                </Flex>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
