import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import HabitEditContent from '../modalContentComponents/HabitEdit';
import { useHabits } from '../../context/HabitProvider';
import handleUpdate from '../../utils/helpers/handleUpdate';

const ShowHabitEditModal = ({ route }) => {
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
    const [selectedFrequency, setSelectedFrequency] = useState('');
    const navigation = useNavigation();

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);
    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);

    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habitItem = getSpecificHabit(route.params.id);
    const {
        id,
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
        frequency,
    } = habitItem;

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
        setSelectedFrequency(frequency);
    }, []);

    const updateColor = (updColor) => {
        setUpdatedColor(updColor);
        setColorUpdated(true);
    };

    const handleSubmit = () => {
        handleUpdate(
            id,
            notificationId,
            habits,
            habitSetter,
            habitName,
            selectedValue,
            updatedColor,
            stateDescription,
            !!isEnabled ? daysCount : 0,
            !!isEnabled ? timesCount : 0,
            isEnabledDate ? new Date(habitReminderTime) : null,
            isEnabledSpecific ? new Date(habitSpecificDate) : null,
            isEnabledEndDate ? new Date(habitEndDate) : null,
            selectedFrequency
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
                setSelectedFrequency,
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
                selectedFrequency,
                color,
                colorUpdated,
                updatedColor,
            }}
        />
    );
};

export default ShowHabitEditModal;
