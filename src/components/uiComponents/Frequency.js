import React from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    DateTimePickerView,
    FrequencySwitchContainer,
    FrequencyTouchable,
} from '../../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import { Fragment } from 'react';

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
            <FrequencySwitchContainer>
                <Text fontFamily="Regular">Complete once</Text>
                <Switch
                    trackColor={{ false: '#767577', true: colors.mainGreen }}
                    thumbColor={isEnabledSpecific ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchSpecific}
                    value={isEnabledSpecific}
                />
            </FrequencySwitchContainer>
            {isEnabledSpecific && (
                <DateTimePickerView>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={specificDate || habitSpecificDate}
                        mode="datetime"
                        is24Hour="true"
                        display="default"
                        themeVariant="dark"
                        onChange={onChangeSpecific}
                    />
                </DateTimePickerView>
            )}

            <FrequencySwitchContainer>
                <Text fontFamily="Regular">Goal</Text>
                <Switch
                    trackColor={{ false: '#767577', true: colors.mainGreen }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </FrequencySwitchContainer>

            {isEnabled && (
                <Fragment>
                    <FrequencyTouchable>
                        <Text>Days per week</Text>
                        <TouchableOpacity
                            style={{ marginLeft: 30 }}
                            onPress={() => {
                                daysCount > 1 && setDaysCount(daysCount - 1);
                            }}
                        >
                            <Feather name="minus-circle" size={30} color="gray" />
                        </TouchableOpacity>
                        <Text fontFamily="Bold" twentyEight>
                            {daysCount === 7 ? <Text>Every day</Text> : daysCount}
                        </Text>
                        <TouchableOpacity
                            onPress={() => daysCount < 7 && setDaysCount(daysCount + 1)}
                        >
                            <Feather name="plus-circle" size={30} color="gray" />
                        </TouchableOpacity>
                    </FrequencyTouchable>
                    <FrequencyTouchable>
                        <RNPickerSelect
                            textInputProps={{
                                fontSize: 19,
                                color: colors.mainGreen,
                                marginTop: 3,
                            }}
                            placeholder={placeholder}
                            onValueChange={(value) => setSelectedValue(value)}
                            items={[
                                { label: 'times', value: 'times' },
                                { label: 'glasses', value: 'glasses' },
                                { label: 'minutes', value: 'minutes' },
                                { label: 'hours', value: 'hours' },
                                { label: 'kilometers', value: 'kilometers' },
                                { label: 'bottles', value: 'bottles' },
                                { label: 'pages', value: 'pages' },
                            ]}
                        />
                        <Text>Per day</Text>
                        <TouchableOpacity
                            onPress={() => timesCount > 1 && setTimesCount(timesCount - 1)}
                        >
                            <Feather name="minus-circle" size={30} color="gray" />
                        </TouchableOpacity>
                        <Text fontFamily="Bold" twentyEight>
                            {timesCount}
                        </Text>
                        <TouchableOpacity onPress={() => setTimesCount(timesCount + 1)}>
                            <Feather name="plus-circle" size={30} color="gray" />
                        </TouchableOpacity>
                    </FrequencyTouchable>
                </Fragment>
            )}
            <FrequencySwitchContainer>
                <Text fontFamily="Regular">End date</Text>
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
            <FrequencySwitchContainer>
                <Text fontFamily="Regular">Reminder</Text>
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
        </View>
    );
}
