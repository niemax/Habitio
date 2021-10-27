import React from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FrequencySwitchContainer, FrequencyTouchable } from '../../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import { Fragment } from 'react';

const placeholder = {
    label: 'Select...',
    value: null,
    color: '#9EA0A4',
};

export default function Frequency({
    switchStates: { isEnabled, isEnabledDate },
    methods: { toggleSwitchSpecific, toggleSwitch, toggleSwitchDate, onChangeSpecific },
    setters: { setDaysCount, setSelectedValue, setTimesCount, setHabitUnitValue },
    values: { specificDate, isEnabledSpecific },
    states: { selectedValue, daysCount, timesCount, habitUnitValue, habitSpecificDate },
}) {
    return (
        <View>
            <FrequencySwitchContainer>
                <Text fontFamily="Regular">Remind on a specific date</Text>
                <Switch
                    trackColor={{ false: '#767577', true: colors.mainGreen }}
                    thumbColor={isEnabledSpecific ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchSpecific}
                    value={isEnabledSpecific}
                />
            </FrequencySwitchContainer>
            {isEnabledSpecific && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={specificDate || habitSpecificDate}
                    mode="datetime"
                    is24Hour="true"
                    display="default"
                    themeVariant="dark"
                    onChange={onChangeSpecific}
                />
            )}

            <FrequencySwitchContainer>
                <Text fontFamily="Regular">Repeat</Text>
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
                        <Text>Days per Week</Text>
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
                                fontSize: 17,
                                color: 'white',
                                marginTop: 3,
                            }}
                            placeholder={placeholder || habitUnitValue}
                            onValueChange={(value) => {
                                setSelectedValue(value);
                            }}
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
            {isEnabled && (
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
            )}
        </View>
    );
}
