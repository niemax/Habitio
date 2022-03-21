import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import HabitEditContent from '../modalContentComponents/HabitEdit';
import { useHabits } from '../../context/HabitProvider';
import handleUpdate from '../../utils/helpers/handleUpdate';

const HabitEditModal = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedColor, setUpdatedColor] = useState();
    const [habitName, setHabitName] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [colorUpdated, setColorUpdated] = useState(false);
    const [stateDescription, setStateDescription] = useState('');
    const [timesCount, setTimesCount] = useState();
    const [habitReminderTime, habitSetReminderTime] = useState();
    const [habitEndDate, habitSetEndDate] = useState();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledEndDate, setIsEnabledEndDate] = useState(false);
    const [selectedFrequency, setSelectedFrequency] = useState('');
    const [weekdays, setWeekdays] = useState();
    const [habitNature, setHabitNature] = useState();

    const { goBack } = useNavigation();

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () => setIsEnabledDate((previousState) => !previousState);

    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);

    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habitItem = getSpecificHabit(route.params.id);
    const { id, color } = habitItem;

    useEffect(() => {
        checkSwitchStates();
        setHabitName(habitItem.name);
        setSelectedValue(habitItem.unitValue);
        setStateDescription(habitItem.description);
        setTimesCount(habitItem.times);
        setUpdatedColor(habitItem.color);
        habitSetReminderTime(habitItem.reminder ? new Date(habitItem.reminder) : new Date());
        habitSetEndDate(habitItem.endDate ? new Date(habitItem.endDate) : new Date());
        setSelectedFrequency(habitItem.frequency);
        setHabitNature(habitItem.habitGoal);
        setWeekdays(habitItem.selectedWeekdays);
    }, []);

    const updateColor = (updColor) => {
        setUpdatedColor(updColor);
        setColorUpdated(true);
    };

    const handleSubmit = () => {
        handleUpdate(
            id,
            habitItem.notificationIds,
            habits,
            habitSetter,
            habitName,
            selectedValue,
            updatedColor,
            stateDescription,
            isEnabled ? timesCount : 0,
            isEnabledDate ? new Date(habitReminderTime) : null,
            isEnabledEndDate ? new Date(habitEndDate) : null,
            selectedFrequency,
            habitNature,
            weekdays
        );
        goBack();
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
        habitItem.reminder && setIsEnabledDate(true);
        habitItem.endDate && setIsEnabledEndDate(true);
        habitItem.times > 0 && setIsEnabled(true);
    };

    return (
        <HabitEditContent
            methods={{
                handleSubmit,
                updateColor,
                toggleSwitch,
                toggleSwitchDate,
                toggleSwitchEndDate,
                onChangeReminderTime,
                onChangeEndDate,
            }}
            setters={{
                setSelectedValue,
                setSelectedFrequency,
                setStateDescription,
                setTimesCount,
                setIsEnabledDate,
                setIsEnabledEndDate,
                setModalVisible,
                habitSetReminderTime,
                habitSetEndDate,
                setWeekdays,
                setHabitNature,
            }}
            states={{
                stateDescription,
                timesCount,
                modalVisible,
                isEnabled,
                isEnabledDate,
                isEnabledEndDate,
                habitReminderTime,
                habitEndDate,
                selectedValue,
                selectedFrequency,
                color,
                colorUpdated,
                updatedColor,
                weekdays,
                habitNature,
            }}
        />
    );
};

export default HabitEditModal;
