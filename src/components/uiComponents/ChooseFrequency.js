import React from 'react';
import { View, Switch } from 'react-native';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    DateTimePickerView,
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitUtilityInfoContainer,
    LineBreak,
} from '../../utils/StyledComponents/Styled';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Box, Flex, HStack, Button } from 'native-base';

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
    setters: { setDaysCount, setSelectedValue, setTimesCount },
    values: { specificDate, reminderTime, endDate, habitReminderTime },
    states: { daysCount, timesCount, habitSpecificDate, habitEndDate },
}) {
    const placeholder = {
        label: 'Choose',
        color: '#9EA0A4',
    };

    return (
        <View>
            <Flex py={4}>
                <Box ml={2}>
                    <Text left fontFamily="Regular" sixteen>
                        Frequency
                    </Text>
                </Box>
                <HabitUtilityInfoContainer>
                    <Box bg="gray.800" px={2} py={1} rounded="lg">
                        <FrequencySwitchContainer>
                            <Text fontFamily="Medium" sixteen>
                                Complete once
                            </Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={isEnabledSpecific ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
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
                                    themeVariant="dark"
                                    onChange={onChangeSpecific}
                                />
                            )}
                        </DateTimePickerView>
                        <View
                            style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.4,
                                opacity: 0.5,
                                marginBottom: 5,
                            }}
                        />
                        <FrequencySwitchContainer>
                            <Text fontFamily="SemiBold" sixteen>
                                Goal
                            </Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.mainGreen }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </FrequencySwitchContainer>
                        {isEnabled && (
                            <>
                                <Box mt={4}>
                                    <Text fontFamily="Regular" left sixteen>
                                        Days per week
                                    </Text>
                                </Box>
                                <FrequencyTouchable>
                                    <Box>
                                        <Text fontFamily="Extra" twentyTwo>
                                            {daysCount === 7 ? <Text>Every day</Text> : daysCount}
                                        </Text>
                                    </Box>
                                    <HStack>
                                        <Button
                                            bg="gray.600"
                                            rounded="md"
                                            onPress={() => {
                                                if (daysCount > 1) {
                                                    setDaysCount(daysCount - 1);
                                                }
                                            }}
                                        >
                                            <Feather name="minus" size={24} color="white" />
                                        </Button>
                                        <Button
                                            bg="gray.600"
                                            rounded="md"
                                            onPress={() => {
                                                if (daysCount < 7) {
                                                    setDaysCount(daysCount + 1);
                                                }
                                            }}
                                        >
                                            <Ionicons name="add-sharp" size={24} color="white" />
                                        </Button>
                                    </HStack>
                                </FrequencyTouchable>

                                <Box mt={6}>
                                    <Text fontFamily="Regular" left sixteen>
                                        per day
                                    </Text>
                                </Box>
                                <FrequencyTouchable>
                                    <HStack>
                                        <Flex direction="row" align="center">
                                            <Text fontFamily="Extra" twentyTwo>
                                                {timesCount}
                                            </Text>
                                            <Box ml={3} mt={1}>
                                                <RNPickerSelect
                                                    textInputProps={{
                                                        fontSize: 20,
                                                        color: 'white',
                                                    }}
                                                    placeholder={placeholder}
                                                    onValueChange={(value) =>
                                                        setSelectedValue(value)
                                                    }
                                                    items={[
                                                        { label: 'times', value: 'times' },
                                                        { label: 'glasses', value: 'glasses' },
                                                        { label: 'minutes', value: 'minutes' },
                                                        { label: 'hours', value: 'hours' },
                                                        {
                                                            label: 'kilometers',
                                                            value: 'kilometers',
                                                        },
                                                        { label: 'bottles', value: 'bottles' },
                                                        { label: 'pages', value: 'pages' },
                                                    ]}
                                                />
                                            </Box>
                                        </Flex>
                                    </HStack>
                                    <HStack>
                                        <Button
                                            bg="gray.600"
                                            rounded="md"
                                            onPress={() => {
                                                if (timesCount > 1) {
                                                    setTimesCount(timesCount - 1);
                                                }
                                            }}
                                        >
                                            <Feather name="minus" size={24} color="white" />
                                        </Button>
                                        <Button
                                            bg="gray.600"
                                            rounded="md"
                                            onPress={() => setTimesCount(timesCount + 1)}
                                        >
                                            <Ionicons name="add-sharp" size={24} color="white" />
                                        </Button>
                                    </HStack>
                                </FrequencyTouchable>
                            </>
                        )}
                    </Box>
                </HabitUtilityInfoContainer>

                <HabitUtilityInfoContainer>
                    <Box mt={2}>
                        <Text
                            marginBottom="10px"
                            left
                            fontFamily="Regular"
                            sixteen
                            marginLeft="10px"
                        >
                            Set an end date
                        </Text>
                        <Box bg="gray.800" p={2} rounded="lg">
                            <FrequencySwitchContainer>
                                <Text fontFamily="Medium" sixteen>
                                    End date
                                </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: colors.mainGreen }}
                                    thumbColor={isEnabledEndDate ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
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
                                        themeVariant="dark"
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
                        <Text
                            marginBottom="10px"
                            left
                            fontFamily="Regular"
                            sixteen
                            marginLeft="10px"
                        >
                            Set a reminder
                        </Text>
                        <Box bg="gray.800" p={2} rounded="lg">
                            <FrequencySwitchContainer>
                                <Text fontFamily="Medium" sixteen>
                                    Reminder
                                </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: colors.mainGreen }}
                                    thumbColor={isEnabledDate ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
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
                                        themeVariant="dark"
                                        is24Hour="true"
                                        onChange={onChangeReminderTime}
                                        display="default"
                                    />
                                </DateTimePickerView>
                            )}
                        </Box>
                    </Box>
                </HabitUtilityInfoContainer>
            </Flex>
        </View>
    );
}
