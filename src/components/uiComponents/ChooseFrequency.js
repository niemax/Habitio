import React from 'react';
import { View, Switch, TextInput, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    DateTimePickerView,
    FrequencySwitchContainer,
    HabitUtilityInfoContainer,
} from '../../utils/StyledComponents/Styled';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    useColorMode,
    KeyboardAvoidingView,
    ScrollView,
} from 'native-base';
import { colors } from '../../utils/colors';
import { render } from 'react-dom';

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
    setters: { setDaysCount, setSelectedValue, setTimesCount, setSnapping },
    values: { specificDate, reminderTime, endDate, habitReminderTime },
    states: { daysCount, timesCount, habitSpecificDate, habitEndDate, selectedValue },
}) {
    const { colorMode } = useColorMode();

    const renderGoal = () =>
        isEnabled && (
            <>
                <Box mt={4}>
                    <Text marginLeft="10px">Days per week</Text>
                </Box>
                <Flex
                    rounded="md"
                    mt={4}
                    px={2}
                    py={1}
                    direction="row"
                    align="center"
                    justify="space-between"
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                >
                    <Box>
                        <Text fontWeight={500}>
                            {daysCount === 7 ? <Text>Every day</Text> : daysCount}
                        </Text>
                    </Box>
                    <HStack>
                        <Button
                            bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                            rounded="sm"
                            size={8}
                            onPress={() => {
                                if (daysCount > 1) {
                                    setDaysCount(daysCount - 1);
                                }
                            }}
                        >
                            <Feather
                                name="minus"
                                size={24}
                                color={colorMode === 'light' ? 'black' : 'white'}
                            />
                        </Button>
                        <Button
                            bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                            rounded="sm"
                            size={8}
                            onPress={() => {
                                if (daysCount < 7) {
                                    setDaysCount(daysCount + 1);
                                }
                            }}
                        >
                            <Ionicons
                                name="add-sharp"
                                size={24}
                                color={colorMode === 'light' ? 'black' : 'white'}
                            />
                        </Button>
                    </HStack>
                </Flex>

                <SafeAreaView>
                    <Box mt={6}>
                        <Text marginLeft="10px">per day</Text>
                    </Box>
                    <Flex
                        rounded="md"
                        mt={4}
                        px={2}
                        py={1}
                        direction="row"
                        align="center"
                        justify="space-between"
                        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                    >
                        <Flex direction="row" align="center">
                            <Text fontWeight={500}>{timesCount}</Text>
                            <Box ml={2}>
                                <TextInput
                                    width={200}
                                    value={selectedValue}
                                    style={{
                                        fontSize: 16,
                                        color: colors.mainPurple,
                                    }}
                                    placeholderTextColor="gray"
                                    onChangeText={(text) => setSelectedValue(text)}
                                />
                            </Box>
                        </Flex>
                        <HStack>
                            <Button
                                bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                                rounded="sm"
                                size={8}
                                onPress={() => {
                                    if (timesCount > 1) {
                                        setTimesCount(timesCount - 1);
                                    }
                                }}
                            >
                                <Feather
                                    name="minus"
                                    size={24}
                                    color={colorMode === 'light' ? 'black' : 'white'}
                                />
                            </Button>
                            <Button
                                bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                                rounded="sm"
                                size={8}
                                onPress={() => setTimesCount(timesCount + 1)}
                            >
                                <Ionicons
                                    name="add-sharp"
                                    size={24}
                                    color={colorMode === 'light' ? 'black' : 'white'}
                                />
                            </Button>
                        </HStack>
                    </Flex>
                </SafeAreaView>
            </>
        );

    return (
        <SafeAreaView>
            <Flex py={4}>
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
                        <FrequencySwitchContainer>
                            <Text fontSize="md">Complete once</Text>
                            <Switch
                                onValueChange={toggleSwitchSpecific}
                                value={isEnabledSpecific}
                            />
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
                        <View
                            style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.4,
                                opacity: 0.4,
                                marginBottom: 5,
                            }}
                        />
                        <FrequencySwitchContainer>
                            <Text fontSize="md">Goal</Text>
                            <Switch onValueChange={toggleSwitch} value={isEnabled} />
                        </FrequencySwitchContainer>
                        {renderGoal()}
                    </Box>
                </HabitUtilityInfoContainer>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}
                >
                    <HabitUtilityInfoContainer>
                        <Box mt={2}>
                            <Text fontSize="xs" marginLeft="15px" mb={2} opacity={0.7}>
                                SET AN END DATE
                            </Text>
                            <Box
                                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                                px={4}
                                py={1}
                                rounded="xl"
                            >
                                <FrequencySwitchContainer>
                                    <Text fontSize="md">End date</Text>
                                    <Switch
                                        onValueChange={toggleSwitchEndDate}
                                        value={isEnabledEndDate}
                                    />
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
                                    <Switch
                                        onValueChange={toggleSwitchDate}
                                        value={isEnabledDate}
                                    />
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
                </KeyboardAvoidingView>
            </Flex>
        </SafeAreaView>
    );
}
