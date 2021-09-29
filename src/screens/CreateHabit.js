import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import { habitBoxShadow } from '../utils/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    ColorModalContainer,
    CreateHabitHeader,
    FrequencyContainer,
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
    const { habitName, habitIcon } = route.params;

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
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
    }, []);

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
                <Text twentyTwo fontFamily="Bold">
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
                    blurOnSubmit={true}
                    multiline
                    placeholder="Habit Description"
                    placeholderTextColor="white"
                    style={{
                        color: 'white',
                        fontSize: 18,
                        fontFamily: 'Bold',
                        ...habitBoxShadow,
                    }}
                    onChange={(text) => setDescription(text)}
                />
                <HabitUtilityInfoContainer>
                    <Text left marginLeft="15px" fontFamily="Regular">
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
                    <Text left marginLeft="10px" marginTop="30px" fontFamily="Regular">
                        Choose frequency
                    </Text>
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

                    <Text left fontFamily="Bold" twenty marginLeft="10px" marginTop="25px">
                        Remind me at
                    </Text>
                    <DateTimePicker
                        style={{ marginLeft: 10, marginTop: 8 }}
                        value={date}
                        mode={mode}
                        is24Hour="true"
                        display="default"
                        onChange={() => setSelectedDate(date)}
                    />
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
