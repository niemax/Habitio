import React, { useState, useEffect } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Image, Modal, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import { habitBoxShadow, showHabitImageBackground } from '../utils/globalStyles';
import ColorPalletteModal from './ColorPalletteModal';
import {
    FrequencyTouchable,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    HomeheaderContainer,
    ModalContent,
    SelectHabitColorButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

export default function ShowHabitEditModal({
    editHabitModalVisible,
    setEditHabitModalVisible,
    data,
    onSubmit,
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [habitName, setHabitName] = useState('');
    const [colorUpdated, setColorUpdated] = useState(false);
    const [stateDescription, setStateDescription] = useState('');
    const [daysCount, setDaysCount] = useState(0);
    const [timesCount, setTimesCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(data.reminders);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');

    const { name, description, days, times, color } = data;

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const handleSubmit = () => {
        setLoading(true);
        onSubmit(habitName, updatedColor, description, daysCount, timesCount);
        setTimeout(() => {
            setLoading(false);
            setEditHabitModalVisible(false);
        }, 1500);
    };

    useEffect(() => {
        setHabitName(name);
        setStateDescription(description);
        setDaysCount(days);
        setTimesCount(times);
        setUpdatedColor(color);
    }, []);

    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={editHabitModalVisible}>
            <ModalContent>
                <HomeheaderContainer>
                    <TouchableOpacity
                        style={{ marginLeft: 10, marginTop: 10 }}
                        onPress={() => setEditHabitModalVisible(false)}
                    >
                        <Ionicons name="close-circle-sharp" size={34} color="gray" />
                    </TouchableOpacity>
                    <Text twentyTwo fontFamily="Extra">
                        Edit Habit
                    </Text>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                            {loading ? (
                                <ActivityIndicator color={colors.mainGreen} />
                            ) : (
                                <Text color={colors.mainGreen}>Update</Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                </HomeheaderContainer>

                <Text left twentyTwo fontFamily="SemiBold" marginLeft="15px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="15px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitDescriptionInput
                        multiline
                        placeholder={stateDescription}
                        placeholderTextColor="white"
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontFamily: 'Bold',
                            ...habitBoxShadow,
                        }}
                        onChange={(text) => setStateDescription(text)}
                    />
                    <HabitUtilityInfoContainer>
                        <Text left marginLeft="15px" fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => setModalVisible(true)}>
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
            </ModalContent>
        </Modal>
    );
}
