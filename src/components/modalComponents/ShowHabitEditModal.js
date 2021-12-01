import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import HabitEditContent from '../../components/modalContentComponents/HabitEdit';
import { useHabits } from '../../context/HabitProvider';
import handleUpdate from '../../utils/helpers/handleUpdate';

export default function ShowHabitEditModal({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [habitName, setHabitName] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [colorUpdated, setColorUpdated] = useState(false);
    const [stateDescription, setStateDescription] = useState('');
    const [daysCount, setDaysCount] = useState();
    const [timesCount, setTimesCount] = useState();
    const [habitReminderTime, habitSetReminderTime] = useState();
    const [habitSpecificDate, habitSetSpecificDate] = useState();
    const [habitEndDate, habitSetEndDate] = useState();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const [isEnabledEndDate, setIsEnabledEndDate] = useState(false);
    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);
    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);
    const navigation = useNavigation();
    const { data } = route.params;
    const {
        notificationId,
        name,
        unitValue,
        description,
        days,
        times,
        color,
        reminder,
        specificDate,
        endDate,
    } = data;

    const { habits, habitSetter } = useHabits();

    const updateColor = (updColor) => {
        setUpdatedColor(updColor);
        setColorUpdated(true);
    };

    const handleSubmit = () => {
        handleUpdate(
            data,
            notificationId,
            habits,
            habitSetter,
            habitName,
            selectedValue,
            updatedColor,
            stateDescription,
            isEnabled ? daysCount : null,
            timesCount,
            isEnabledDate ? new Date(habitReminderTime) : null,
            isEnabledSpecific ? new Date(habitSpecificDate) : null,
            isEnabledEndDate ? new Date(habitEndDate) : null
        );
        navigation.goBack();
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        habitSetSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || habitReminderTime;
        habitSetReminderTime(currentDate);
    };

    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || habitEndDate;
        habitSetEndDate(currentDate);
    };

    const checkSwitchStates = () => {
        if (reminder !== null) {
            setIsEnabledDate(true);
        }
        if (specificDate !== null) {
            setIsEnabledSpecific(true);
        }
        if (endDate !== null) {
            setIsEnabledEndDate(true);
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
        setSelectedValue(unitValue);
        setStateDescription(description);
        setDaysCount(days);
        setTimesCount(times);
        setUpdatedColor(color);
        habitSetReminderTime(reminder ? new Date(reminder) : new Date());
        habitSetSpecificDate(specificDate ? new Date(specificDate) : new Date());
        habitSetEndDate(endDate ? new Date(endDate) : new Date());
    }, []);

    return (
        <HabitEditContent
            methods={{
                handleSubmit,
                updateColor,
                toggleSwitchSpecific,
                toggleSwitch,
                toggleSwitchDate,
                toggleSwitchEndDate,
                onChangeSpecific,
                onChangeReminderTime,
                onChangeEndDate,
            }}
            setters={{
                setSelectedValue,
                setStateDescription,
                setDaysCount,
                setTimesCount,
                setIsEnabledDate,
                setIsEnabledEndDate,
                setModalVisible,
                habitSetReminderTime,
                habitSetSpecificDate,
                habitSetEndDate,
            }}
            states={{
                habitName,
                stateDescription,
                daysCount,
                timesCount,
                modalVisible,
                isEnabled,
                isEnabledDate,
                isEnabledSpecific,
                isEnabledEndDate,
                habitSpecificDate,
                habitReminderTime,
                habitEndDate,
                selectedValue,
                color,
                colorUpdated,
                updatedColor,
            }}
        />
    );
}
