import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import HabitEditContent from './modalComponents/HabitEdit';

export default function ShowHabitEditModal({
    editHabitModalVisible,
    setEditHabitModalVisible,
    data,
    onSubmit,
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [habitName, setHabitName] = useState('');
    const [habitUnitValue, setHabitUnitValue] = useState('');
    const [colorUpdated, setColorUpdated] = useState(false);
    const [stateDescription, setStateDescription] = useState('');
    const [daysCount, setDaysCount] = useState();
    const [timesCount, setTimesCount] = useState();
    const [loading, setLoading] = useState(false);
    const [habitReminderTime, habitSetReminderTime] = useState();
    const [habitSpecificDate, habitSetSpecificDate] = useState();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);

    const { name, unitValue, description, days, times, color, reminder, specificDate } = data;

    const updateColor = (updColor) => {
        setUpdatedColor(updColor);
        setColorUpdated(true);
    };

    const handleSubmit = () => {
        setLoading(true);
        onSubmit(
            habitName,
            habitUnitValue,
            updatedColor,
            stateDescription,
            isEnabled ? daysCount : null,
            timesCount,
            isEnabledDate ? new Date(habitReminderTime) : null,
            isEnabledSpecific ? new Date(habitSpecificDate) : null
        );
        setTimeout(() => {
            setLoading(false);
            setEditHabitModalVisible(false);
        }, 200);
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        habitSetSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || habitReminderTime;
        habitSetReminderTime(currentDate);
    };

    const checkSwitchStates = () => {
        if (reminder !== null) {
            setIsEnabledDate(true);
        } else {
            setIsEnabledDate(false);
        }
        if (specificDate !== null) {
            setIsEnabledSpecific(true);
        } else {
            setIsEnabledSpecific(false);
        }
        if (days >= 1) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    };

    useEffect(() => {
        checkSwitchStates();

        setHabitName(name);
        setHabitUnitValue(unitValue);
        setStateDescription(description);
        setDaysCount(days);
        setTimesCount(times);
        setUpdatedColor(color);
        habitSetReminderTime(reminder ? new Date(reminder) : new Date());
        habitSetSpecificDate(specificDate ? new Date(specificDate) : new Date());
    }, []);

    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={editHabitModalVisible}>
            <HabitEditContent
                methods={{
                    handleSubmit,
                    updateColor,
                    toggleSwitchSpecific,
                    toggleSwitch,
                    toggleSwitchDate,
                    onChangeSpecific,
                    onChangeReminderTime,
                }}
                setters={{
                    setEditHabitModalVisible,
                    setHabitUnitValue,
                    setStateDescription,
                    setDaysCount,
                    setTimesCount,
                    setIsEnabledDate,
                    setModalVisible,
                    habitSetReminderTime,
                    habitSetSpecificDate,
                }}
                states={{
                    habitName,
                    loading,
                    stateDescription,
                    daysCount,
                    timesCount,
                    modalVisible,
                    isEnabled,
                    isEnabledDate,
                    isEnabledSpecific,
                    habitSpecificDate,
                    habitReminderTime,
                    habitUnitValue,
                    color,
                    colorUpdated,
                    updatedColor,
                }}
            />
        </Modal>
    );
}
