import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, View, Switch } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../utils/colors';
import { habitBoxShadow } from '../utils/globalStyles';
import ColorPalletteModal from './ColorPalletteModal';
import {
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitCentered,
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
    const [habitReminderTime, habitSetReminderTime] = useState();
    const [habitSpecificDate, habitSetSpecificDate] = useState();
    const [show, setShow] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () => setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () => setIsEnabledSpecific((previousState) => !previousState);

    const { name, description, days, times, color, reminder, specificDate } = data;

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const handleSubmit = () => {
        setLoading(true);
        onSubmit(
            habitName,
            updatedColor,
            description,
            daysCount,
            timesCount,
            habitReminderTime,
            habitSpecificDate
        );

        setTimeout(() => {
            setLoading(false);
            setEditHabitModalVisible(false);
        }, 1500);
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        setShow(Platform.OS === 'ios');
        habitSetSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || habitReminderTime;
        setShow(Platform.OS === 'ios');
        habitSetReminderTime(currentDate);
    };

    useEffect(() => {
        setHabitName(name);
        setStateDescription(description);
        setDaysCount(days);
        setTimesCount(times);
        setUpdatedColor(color);
        habitSetReminderTime(new Date(reminder));
        habitSetSpecificDate(new Date(specificDate));
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
                    <HabitCentered>
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
                    </HabitCentered>
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
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={habitSpecificDate}
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
                                value={habitReminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={onChangeReminderTime}
                            />
                        )}
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
