import React, { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import ActionSheet from 'react-native-actions-sheet';
import { habitBoxShadow } from '../utils/globalStyles';
import * as Notifications from 'expo-notifications';
import {
    CreateHabitHeader,
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitCentered,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    MainContainer,
    SelectHabitColorButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import schedulePushNotification from '../utils/helpers/notification';

export default function CreateHabit({ navigation, route }) {
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [specificDate, setSpecificDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [id, setId] = useState();

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);

    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);

    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);

    const { CRUDHabits } = useHabits();

    const sheetRef = useRef(null);

    const { habitName, habitIcon, color } = route.params;

    const placeholder = {
        label: 'Choose...',
        value: null,
        color: '#9EA0A4',
    };

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        setSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || reminderTime;
        setReminderTime(currentDate);
    };

    const scheduleRepeating = async (hours, minutes) => {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: habitName,
                body: `Time to be productive! Your daily reminder to ${habitName}`,
            },
            trigger: {
                hour: hours,
                minute: minutes,
                repeats: true,
            },
        });
        setId(identifier);
    };

    const scheduleOneTime = async (date) => {
        let identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: habitName,
                body: `Time to be productive! Your daily reminder to ${habitName}`,
            },
            trigger: {
                date: date,
                repeats: false,
            },
        });
        return identifier;
    };

    const handleHabitCreation = async () => {
        const newHabit = {
            name: habitName,
            id: Math.floor(Math.random() * 1000),
            color: color || updatedColor,
            icon: habitIcon,
            days: isEnabled ? daysCount : null,
            times: isEnabled ? timesCount : null,
            specificDate: isEnabledSpecific ? specificDate : null,
            reminder: isEnabledDate ? reminderTime : null,
            unitValue: selectedValue,
            description: description,
            completedDay: null,
            currentDay: 0,
            completed: false,
            completedDates: {},
            timesCompleted: 0,
            progress: 0,
            diaryInputs: [],
        };
        setLoading(true);

        const reminderTimeHours = reminderTime.getHours();
        const reminderTimeMinutes = reminderTime.getMinutes();

        try {
            const identifier = await Notifications.scheduleNotificationAsync({
                content: {
                    title: habitName,
                    body: `Time to be productive! Your daily reminder to ${habitName}`,
                },
                trigger: {
                    hour: reminderTimeHours,
                    minute: reminderTimeMinutes,
                    repeats: true,
                },
            });

            Object.assign(newHabit, { notificationId: identifier });
            CRUDHabits(newHabit);
            console.log(newHabit);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setLoading(false);
            navigation.navigate('MainTab');
        }, 2000);
    };

    return (
        <MainContainer>
            <CreateHabitHeader>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={32} color="white" />
                </TouchableOpacity>
                <Text twentyTwo fontFamily="Extra">
                    Create Habit
                </Text>
                <TouchableOpacity onPress={handleHabitCreation}>
                    {loading ? (
                        <ActivityIndicator color={colors.mainGreen} />
                    ) : (
                        <Text color={colors.mainGreen}>Create</Text>
                    )}
                </TouchableOpacity>
            </CreateHabitHeader>
            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitCentered>
                        <HabitDescriptionInput
                            keyboardAppearance="dark"
                            multiline={true}
                            autoCorrect={false}
                            value={description}
                            placeholder="Habit Description"
                            placeholderTextColor="gray"
                            style={{
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'SemiBold',
                                ...habitBoxShadow,
                            }}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </HabitCentered>
                    <HabitUtilityInfoContainer>
                        <Text left fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => sheetRef.current.show()}>
                            {!colorUpdated ? (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: updatedColor,
                                    }}
                                />
                            )}
                        </SelectHabitColorButton>

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
                                value={specificDate}
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
                            <>
                                <FrequencyTouchable>
                                    <Text>Days per Week</Text>
                                    <TouchableOpacity
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
                                            fontSize: 18,
                                            color: 'white',
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
                                        ]}
                                    />
                                    <Text>Per day</Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            timesCount > 1 && setTimesCount(timesCount - 1)
                                        }
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
                            </>
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
                            <DateTimePicker
                                value={reminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={onChangeReminderTime}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
                <ActionSheet
                    containerStyle={{
                        backgroundColor: '#141414',
                        height: 270,
                    }}
                    defaultOverlayOpacity={0.3}
                    gestureEnabled="true"
                    elevation={2}
                    ref={sheetRef}
                >
                    <ColorPalletteModal
                        ref={sheetRef}
                        updateColor={updateColor}
                        sheetRef={sheetRef}
                    />
                </ActionSheet>
            </ScrollView>
        </MainContainer>
    );
}
