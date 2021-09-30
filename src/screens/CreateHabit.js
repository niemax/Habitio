import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import { habitBoxShadow } from '../utils/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    ColorModalContainer,
    CreateHabitHeader,
    FrequencyContainer,
    FrequencyHabitContainer,
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    MainContainer,
    ReminderContainer,
    SelectHabitColorButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHabits } from '../context/HabitProvider';

export default function CreateHabit({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [storageItems, setStorageItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () => setIsEnabledDate((previousState) => !previousState);

    const { getHabits, setHabits, habits } = useHabits();

    const { habitName, habitIcon } = route.params;

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const readData = async () => {
        try {
            const habitData = await AsyncStorage?.getItem('@habit');
            if (habitData != null) {
                setStorageItems(JSON.parse(habitData));
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        readData();
    }, [isEnabled]);

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
            reminder: selectedDate,
            description: description,
            progress: 0,
        };

        try {
            setStorageItems([...storageItems, newHabit]);
            await AsyncStorage.setItem('@habit', JSON.stringify([...storageItems, newHabit]));
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
            <Text left twentyTwo fontFamily="SemiBold" marginLeft="15px" marginTop="30px">
                {habitName}
            </Text>
            <Text left marginLeft="15px" fontFamily="Regular" marginTop="35px">
                Description
            </Text>
            <HabitInfoContainer>
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
                        <Text marginRight="260px" fontFamily="Regular">
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
                            value={date}
                            mode={mode}
                            onChange={onChange}
                            is24Hour="true"
                            onChange={() => setSelectedDate(date)}
                        />
                    )}
                </HabitUtilityInfoContainer>
            </HabitInfoContainer>
            <ColorPalletteModal
                updateColor={updateColor}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </MainContainer>
    );
}
