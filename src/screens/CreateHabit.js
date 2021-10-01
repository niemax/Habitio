import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import { habitBoxShadow } from '../utils/globalStyles';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import schedulePushNotification from '../utils/helpers/notification';

export default function CreateHabit({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [storageItems, setStorageItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [valueDate, setValueDate] = useState(new Date());
    const [timeDate, setTimeDate] = useState(new Date());
    const [specificDate, setSpecificDate] = useState();
    const [mode, setMode] = useState('time');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () => setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () => setIsEnabledSpecific((previousState) => !previousState);

    const { CRUDHabits } = useHabits();

    const { habitName, habitIcon } = route.params;

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const title = 'App-Name';
    const body = `Time to get active!\n-your daily reminder to complete\n${habitName}`;
    const data = 'aowjidjioadjioawjioa';

    const handleHabitCreation = async () => {
        setLoading(true);

        const newHabit = {
            name: habitName,
            color: updatedColor,
            icon: habitIcon,
            currentDay: null,
            completed: false,
            completedDates: {},
            days: daysCount,
            times: timesCount,
            timesCompleted: 0,
            specificDate: null || specificDate,
            reminder: null || selectedDate,
            description: description,
            progress: 0,
        };

        try {
            console.log(newHabit);
            CRUDHabits(newHabit);
            schedulePushNotification(title, body);
            setTimeout(() => {
                setLoading(false);
                navigation.pop(3);
            }, 2000);
        } catch (e) {
            console.log(e);
        }
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
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="15px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="15px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitCentered>
                        <HabitDescriptionInput
                            autoCorrect={false}
                            multiline
                            placeholder="Habit Description"
                            placeholderTextColor="white"
                            style={{
                                fontSize: 17,
                                fontFamily: 'SemiBold',
                                ...habitBoxShadow,
                            }}
                            onChange={(text) => setDescription(text)}
                        />
                    </HabitCentered>
                    <HabitUtilityInfoContainer>
                        <Text left marginLeft="10px" fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => setModalVisible(true)}>
                            {!colorUpdated ? (
                                <Feather name="chevron-down" size={28} color="white" />
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
                            <Text fontFamily="Regular">Specific date</Text>
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
                                value={valueDate}
                                mode="datetime"
                                is24Hour="true"
                                onChange={() => setSpecificDate(valueDate)}
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
                                        onPress={() => daysCount > 1 && setDaysCount(daysCount - 1)}
                                    >
                                        <Feather name="minus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                    <Text fontFamily="Bold" twentyEight>
                                        {daysCount}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => daysCount < 7 && setDaysCount(daysCount + 1)}
                                    >
                                        <Feather name="plus-circle" size={30} color="gray" />
                                    </TouchableOpacity>
                                </FrequencyTouchable>
                                <FrequencyTouchable>
                                    <Text>Times per Day</Text>
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
                            <Text fontFamily="Regular" twenty>
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
                            <DateTimePicker
                                value={timeDate}
                                mode="time"
                                is24Hour="true"
                                onChange={() => setSelectedDate(timeDate)}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
                <ColorPalletteModal
                    updateColor={updateColor}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ScrollView>
        </MainContainer>
    );
}
