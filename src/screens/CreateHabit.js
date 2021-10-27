import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    MainContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import HabitInput from '../components/uiComponents/HabitDescriptionInput';
import Frequency from '../components/uiComponents/Frequency';
import CHHeader from '../components/uiComponents/CreateHabitHeader';
import HabitColor from '../components/uiComponents/SelectHabitColorButton';
import getWeek from 'date-fns/getWeek';

export default function CreateHabit({ route }) {
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [specificDate, setSpecificDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);

    const { CRUDHabits } = useHabits();

    const { habitName, habitIcon, color } = route.params;

    const currentWeek = getWeek(new Date());

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
    };

    const onChangeSpecific = (event, selectedDate) => {
        const currentDate = selectedDate || specificDate;
        setSpecificDate(currentDate);
    };

    const onChangeReminderTime = (event, selectedDate) => {
        const currentDate = selectedDate || reminderTime;
        setReminderTime(currentDate);
    };

    const newHabit = {
        name: habitName,
        id: Math.floor(Math.random() * 10000),
        color: color || updatedColor,
        icon: habitIcon,
        days: isEnabled ? daysCount : null,
        times: isEnabled ? timesCount : null,
        specificDate: isEnabledSpecific ? specificDate : null,
        reminder: isEnabledDate ? reminderTime : null,
        unitValue: selectedValue,
        description: description,
        completedDay: null,
        dataCurrentWeek: currentWeek,
        streak: [],
        currentDay: 0,
        completed: false,
        completedDates: {},
        timesCompleted: 0,
        progress: 0,
        diaryInputs: [],
    };

    return (
        <MainContainer>
            <CHHeader
                newHabit={newHabit}
                isEnabledDate={isEnabledDate}
                isEnabledSpecific={isEnabledSpecific}
                CRUDHabits={CRUDHabits}
                reminderTime={reminderTime}
                habitName={habitName}
                specificDate={specificDate}
            />
            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitInput
                        values={description}
                        actions={{
                            setValue: (text) => setDescription(text),
                        }}
                    />
                    <HabitUtilityInfoContainer>
                        <Text left fontFamily="Regular">
                            Color
                        </Text>
                        <HabitColor
                            colorUpdated={colorUpdated}
                            updatedColor={updatedColor}
                            color={color}
                            updateColor={updateColor}
                        />
                        <Frequency
                            switchStates={{ isEnabledSpecific, isEnabled, isEnabledDate }}
                            methods={{
                                toggleSwitchSpecific,
                                onChangeSpecific,
                                toggleSwitch,
                                toggleSwitchDate,
                            }}
                            setters={{
                                setDaysCount,
                                setSelectedValue,
                                setTimesCount,
                            }}
                            values={{ specificDate, isEnabledSpecific }}
                            states={{ daysCount, timesCount, selectedValue }}
                        />

                        {isEnabledDate && (
                            <DateTimePicker
                                value={reminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={onChangeReminderTime}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
            </ScrollView>
        </MainContainer>
    );
}
