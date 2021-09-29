import React, { useState, useEffect } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Image, Modal, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import { habitBoxShadow, showHabitImageBackground } from '../utils/globalStyles';
import ColorPalletteModal from './ColorPalletteModal';
import {
    CreateHabitHeader,
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
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(0);
    const [timesCount, setTimesCount] = useState(0);
    const [storageItems, setStorageItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(data.reminders);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');

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
                    <Text twentyTwo fontFamily="Bold">
                        Edit Habit
                    </Text>
                    <TouchableOpacity onPress={() => setEditHabitModalVisible(true)}>
                        <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                            Update
                        </Text>
                    </TouchableOpacity>
                </HomeheaderContainer>

                <Text left twentyTwo fontFamily="SemiBold" marginLeft="15px" marginTop="30px">
                    {data.name}
                </Text>
                <Text left marginLeft="15px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitDescriptionInput
                        blurOnSubmit={true}
                        multiline
                        placeholder={data.description}
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
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: data.color,
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
                                {data.days}
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
                                onPress={() => daysCount > 1 && setTimesCount(timesCount - 1)}
                            >
                                <Feather name="minus-circle" size={30} color="gray" />
                            </TouchableOpacity>
                            <Text fontFamily="Bold" twentyEight>
                                {data.times}
                            </Text>
                            <TouchableOpacity onPress={() => setTimesCount(data.times + 1)}>
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
