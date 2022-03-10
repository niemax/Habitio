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
    const {
        id,
        notificationId,
        name,
        unitValue,
        description,
        times,
        color,
        reminder,
        endDate,
        frequency,
        habitGoal,
        selectedWeekdays,
    } = habitItem;

    useEffect(() => {
        checkSwitchStates();
        setHabitName(name);
        setSelectedValue(unitValue);
        setStateDescription(description);
        setTimesCount(times);
        setUpdatedColor(color);
        habitSetReminderTime(reminder ? new Date(reminder) : new Date());
        habitSetEndDate(endDate ? new Date(endDate) : new Date());
        setSelectedFrequency(frequency);
        setHabitNature(habitGoal);
        setWeekdays(selectedWeekdays);
    }, []);

    const updateColor = (updColor) => {
        setUpdatedColor(updColor);
        setColorUpdated(true);
    };

    const handleSubmit = async () => {
        handleUpdate(
            id,
            notificationId,
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
        if (reminder !== null) {
            setIsEnabledDate(true);
        }
        if (endDate !== null) {
            setIsEnabledEndDate(true);
        }
        if (times >= 1) {
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

export default ShowHabitEditModal;
