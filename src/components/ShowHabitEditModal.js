import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import ColorPalletteModal from './ColorPalletteModal';
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

    const updateColor = (color) => {
        setUpdatedColor(color);
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
        }, 1500);
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        habitSetSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || habitReminderTime;
        habitSetReminderTime(currentDate);
    };

    useEffect(() => {
        setHabitName(name);
        setHabitUnitValue(unitValue);
        setStateDescription(description);
        setDaysCount(days);
        setTimesCount(times);
        setUpdatedColor(color);
        habitSetReminderTime(new Date(reminder));
        habitSetSpecificDate(new Date(specificDate));

        reminder !== null ? setIsEnabledDate(true) : setIsEnabledDate(false);
        specificDate !== null ? setIsEnabledSpecific(true) : setIsEnabledSpecific(false);
        days >= 1 ? setIsEnabled(true) : setIsEnabled(false);
    }, []);

    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={editHabitModalVisible}>
            <HabitEditContent
                handleSubmit={handleSubmit}
                setEditHabitModalVisible={setEditHabitModalVisible}
                editHabitModalVisible={editHabitModalVisible}
                loading={loading}
                habitName={habitName}
                unitValue={unitValue}
                setHabitUnitValue={setHabitUnitValue}
                stateDescription={stateDescription}
                setStateDescription={setStateDescription}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                isEnabledSpecific={isEnabledSpecific}
                toggleSwitchSpecific={toggleSwitchSpecific}
                habitSpecificDate={habitSpecificDate}
                isEnabled={isEnabled}
                toggleSwitch={toggleSwitch}
                daysCount={daysCount}
                setDaysCount={setDaysCount}
                timesCount={timesCount}
                setTimesCount={setTimesCount}
                isEnabledDate={isEnabledDate}
                setIsEnabledDate={setIsEnabledDate}
                toggleSwitchDate={toggleSwitchDate}
                habitReminderTime={habitReminderTime}
                onChangeReminderTime={onChangeReminderTime}
                onChangeSpecific={onChangeSpecific}
                color={color}
                updatedColor={updatedColor}
                colorUpdated={colorUpdated}
                updateColor={updateColor}
            />
        </Modal>
    );
}
