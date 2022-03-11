import React from 'react';
import { View, Switch, TextInput, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    FrequencySwitchContainer,
    HabitUtilityInfoContainer,
} from '../../utils/StyledComponents/Styled';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Box, Flex, Button, Text, useColorMode, KeyboardAvoidingView, HStack } from 'native-base';
import useSettings from '../../hooks/useSettings';
import { useNavigation } from '@react-navigation/native';
import ListContainer from './ListContainer';
import { SettingTouchable } from '../../screens/SettingsScreen';

const Details = ({
    switchStates: { isEnabled, isEnabledDate, isEnabledEndDate },
    methods: {
        onChangeReminderTime,
        onChangeEndDate,
        toggleSwitch,
        toggleSwitchDate,
        toggleSwitchEndDate,
    },
    setters: { setSelectedValue, setTimesCount, setSelectedFrequency, setWeekdays, setHabitNature },
    values: { reminderTime, endDate, habitReminderTime },
    states: { timesCount, habitEndDate, selectedValue, selectedFrequency, weekdays, habitNature },
}) => {
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

    const isSelectedDaily = selectedFrequency === 'daily';

    const handleWeekdays = (weekdays) => setWeekdays(weekdays);

    const handleHabitNature = (nature) => setHabitNature(nature);

    const handleFrequencySelection = (frequency) => {
        setSelectedFrequency(frequency);
    };

    const renderHowOftenContainer = () => (
        <Box mt={2}>
            <ListContainer rounded="xl">
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
                        <Text opacity={0.7} fontSize="md">
                            {habitNature}
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color="gray" />
                    </HStack>
                </SettingTouchable>
                {renderLineBreak()}
                <SettingTouchable
                    style={{ marginTop: 5, marginBottom: 5 }}
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
                    <Text fontSize="md">How often?</Text>
                    <HStack>
                        <Text opacity={0.7} fontSize="md">
                            {!weekdays?.length ? selectedFrequency : 'Selected weekdays'}
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color="gray" />
                    </HStack>
                </SettingTouchable>
                {!!isSelectedDaily && renderLineBreak()}
                {renderReminder()}
            </ListContainer>
        </Box>
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
                        <Box w={200} py={1}>
                            <DateTimePicker
                                style={{ position: 'relative', right: 35 }}
                                testID="dateTimePicker"
                                value={endDate || habitEndDate}
                                mode="datetime"
                                themeVariant={colorMode === 'light' ? 'light' : 'dark'}
                                is24Hour="true"
                                onChange={onChangeEndDate}
                                display="default"
                            />
                        </Box>
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

    const renderGoal = () => (
        <Box mt={4}>
            <Text fontSize="xs" marginLeft="15px" opacity={0.7}>
                {`${selectedFrequency?.toUpperCase()} ${
                    habitNature === 'Build a habit' ? 'GOAL' : 'MAXIMUM'
                }`}
            </Text>
            <HabitUtilityInfoContainer>
                <Box bg={colorMode === 'dark' ? 'gray.800' : 'white'} px={3} py={3} rounded="xl">
                    <SafeAreaView>
                        <Flex rounded="md" direction="row" align="center" justify="space-between">
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
        isSelectedDaily && (
            <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} rounded="xl">
                <FrequencySwitchContainer>
                    <Text fontSize="md">Remind me</Text>
                    <Switch onValueChange={toggleSwitchDate} value={isEnabledDate} />
                </FrequencySwitchContainer>
                {isEnabledDate && (
                    <Box w={200} py={1}>
                        <DateTimePicker
                            style={{ position: 'relative', right: 120 }}
                            testID="dateTimePicker"
                            value={reminderTime || habitReminderTime}
                            mode="time"
                            themeVariant={colorMode === 'light' ? 'light' : 'dark'}
                            is24Hour="true"
                            onChange={onChangeReminderTime}
                            display="compact"
                        />
                    </Box>
                )}
            </Box>
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
                    {renderHowOftenContainer()}
                    {renderGoal()}
                    {renderEndDate()}
                </Flex>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Details;
