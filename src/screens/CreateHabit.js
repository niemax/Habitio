import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import { habitBoxShadow } from '../utils/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    ColorModalContainer,
    CreateHabitHeader,
    FrequencyTouchable,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    MainContainer,
    ReminderContainer,
    SelectHabitColorButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateHabit({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState('');
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const { data, name } = route.params;

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const handleHabitCreation = () => {
        setLoading(true);

        const newHabit = {
            name: name,
            color: updatedColor.toString(),
            days: daysCount,
            times: timesCount,
            reminder: selectedDate,
            description: description,
        };

        const stringifiedHabit = JSON.stringify(newHabit);

        try {
            AsyncStorage.setItem('@habit', stringifiedHabit);
            setTimeout(() => {
                setLoading(false);
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };
    /*  const setItemToStorage = async () => {
        try {
            const item = [1, 2, 3, 4, 5];
            const jsonValue = JSON.stringify(item);
            AsyncStorage.setItem('@test_item', jsonValue);
            console.log('Item stored.', jsonValue);
        } catch (error) {
            console.error(error);
        }
    }; */
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
            <HabitInfoContainer>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="15px" marginTop="30px">
                    {name}
                </Text>
                <Text left marginLeft="15px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitDescriptionInput
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
                    <Text left marginLeft="15px" marginTop="30px" fontFamily="Regular">
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
                        <Feather name="chevron-right" size={32} color="white" />
                    </FrequencyTouchable>
                    <FrequencyTouchable>
                        <Text>Times per Day</Text>
                        <TouchableOpacity onPress={() => setTimesCount(timesCount - 1)}>
                            <Feather name="minus-circle" size={30} color="gray" />
                        </TouchableOpacity>
                        <Text fontFamily="Bold" twentyEight>
                            {timesCount}
                        </Text>
                        <TouchableOpacity onPress={() => setTimesCount(timesCount + 1)}>
                            <Feather name="plus-circle" size={30} color="gray" />
                        </TouchableOpacity>
                        <Feather name="chevron-right" size={32} color="white" />
                    </FrequencyTouchable>
                    <Text left fontFamily="Bold" twenty marginLeft="15px" marginTop="35px">
                        Remind me at
                    </Text>
                    <DateTimePicker
                        style={{ marginLeft: 15, marginTop: 8 }}
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
