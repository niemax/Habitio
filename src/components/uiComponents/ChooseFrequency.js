import React from 'react';
import { View, Switch, TextInput, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    DateTimePickerView,
    FrequencySelector,
    FrequencySwitchContainer,
    HabitUtilityInfoContainer,
} from '../../utils/StyledComponents/Styled';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Box, Flex, Button, Text, useColorMode, KeyboardAvoidingView, Center } from 'native-base';
import { colors } from '../../utils/colors';

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
    setters: { setDaysCount, setSelectedValue, setTimesCount, setSelectedFrequency },
    values: { specificDate, reminderTime, endDate, habitReminderTime },
    states: {
        daysCount,
        timesCount,
        habitSpecificDate,
        habitEndDate,
        selectedValue,
        selectedFrequency,
    },
}) {
    const { colorMode } = useColorMode();

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

    const handleFrequencySelection = (frequency) => {
        setSelectedFrequency(frequency);
        setDaysCount(1);
        setTimesCount(1);
    };

    const renderMonthlyOrWeeklyContainer = () =>
        isEnabled && (
            <>
                <Box mt={6}>
                    <Text fontSize="xs" opacity={0.7}>
                        I WANT TO COMPLETE THE HABIT
                    </Text>
                </Box>
                <Box mt={2}>
                    <FrequencySelector onPress={() => handleFrequencySelection('weekly')}>
                        <Text fontSize="md">Weekly</Text>
                        {isSelectedWeekly ? (
                            <Center rounded="full" bg={colors.mainPurple} w={6} h={6}>
                                {isSelectedWeekly && (
                                    <Ionicons name="checkmark" size="auto" color="white" />
                                )}
                            </Center>
                        ) : null}
                    </FrequencySelector>
                </Box>
                {renderLineBreak()}
                <FrequencySelector onPress={() => handleFrequencySelection('monthly')}>
                    <Text fontSize="md">Monthly</Text>
                    {!isSelectedWeekly ? (
                        <Center rounded="full" bg={colors.mainPurple} w={6} h={6}>
                            {!isSelectedWeekly && (
                                <Ionicons name="checkmark" size="auto" color="white" />
                            )}
                        </Center>
                    ) : null}
                </FrequencySelector>
            </>
        );

    const handleDaysCount = () => {
        if (isSelectedWeekly && daysCount < 7) {
            setDaysCount(daysCount + 1);
        } else if (!isSelectedWeekly && daysCount <= 31) {
            setDaysCount(daysCount + 1);
        }
    };

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
                    {`${selectedFrequency?.toUpperCase()} GOAL`}
                </Text>
                <HabitUtilityInfoContainer>
                    <Box
                        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                        px={3}
                        py={3}
                        rounded="xl"
                    >
                        <Box mt={2}>
                            <Text fontSize="xs" opacity={0.7}>
                                PER {isSelectedWeekly ? 'WEEK' : 'MONTH'}
                            </Text>
                        </Box>
                        <Flex
                            rounded="md"
                            mt={2}
                            direction="row"
                            align="center"
                            justify="space-between"
                        >
                            <Box>
                                {isSelectedWeekly ? (
                                    <Text fontSize="md">
                                        {isSelectedWeekly && daysCount === 7 ? (
                                            <Text>Every day</Text>
                                        ) : (
                                            daysCount
                                        )}
                                    </Text>
                                ) : (
                                    <Text>{daysCount <= 31 && daysCount}</Text>
                                )}
                            </Box>
                            <Flex
                                direction="row"
                                bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                                rounded="lg"
                                align="center"
                                justify="center"
                                px={1}
                            >
                                <Button
                                    bg="transparent"
                                    _pressed={{ background: 'transparent' }}
                                    size={8}
                                    onPress={() => {
                                        if (daysCount > 1) {
                                            setDaysCount(daysCount - 1);
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
                                    size={8}
                                    bg="transparent"
                                    _pressed={{ background: 'transparent' }}
                                    onPress={handleDaysCount}
                                >
                                    <Ionicons
                                        name="add-sharp"
                                        size={22}
                                        color={colorMode === 'light' ? 'black' : 'white'}
                                    />
                                </Button>
                            </Flex>
                        </Flex>
                        {isSelectedWeekly && renderLineBreak()}
                        <SafeAreaView>
                            {isSelectedWeekly && (
                                <Box mt={4}>
                                    <Text fontSize="xs" opacity={0.7}>
                                        PER DAY
                                    </Text>
                                </Box>
                            )}
                            {isSelectedWeekly && (
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
                            )}
                        </SafeAreaView>
                        {renderLineBreak()}
                        <Box mt={3}>
                            <TextInput
                                clearButtonMode="always"
                                placeholder="Unit (e.g. minutes)"
                                width="100%"
                                value={selectedValue}
                                style={{
                                    fontSize: 16,
                                    color: colors.mainPurple,
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
                <Flex mt={4}>
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
                            {renderMonthlyOrWeeklyContainer()}
                        </Box>
                    </HabitUtilityInfoContainer>
                    {renderGoalIfEnabled()}
                    {renderEndDate()}
                    {renderReminder()}
                </Flex>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
