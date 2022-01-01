import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { HabitUtilityInfoContainer, MainContainer } from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import HabitInput from '../components/uiComponents/HabitDescriptionInput';
import Frequency from '../components/uiComponents/ChooseFrequency';
import CHHeader from '../components/uiComponents/CreateHabitHeader';
import HabitColor from '../components/uiComponents/SelectHabitColorButton';
import { getCurrentWeek } from '../utils/helpers/dateHelpers';

export default function CreateHabit({ route }) {
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [specificDate, setSpecificDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const [isEnabledEndDate, setIsEnabledEndDate] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [loading, setLoading] = useState(false);

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);
    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);

    const { habitName, habitIcon, color } = route.params;

    const currentWeek = getCurrentWeek();

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

    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || reminderTime;
        setEndDate(currentDate);
    };

    const newHabit = {
        name: habitName,
        id: Math.floor(Math.random() * 10000),
        color: color || updatedColor,
        icon: habitIcon,
        days: isEnabled ? daysCount : 0,
        times: isEnabled ? timesCount : 0,
        specificDate: isEnabledSpecific ? specificDate : null,
        reminder: isEnabledDate ? reminderTime : null,
        endDate: isEnabledEndDate ? endDate : null,
        unitValue: selectedValue,
        description: description,
        completedDay: null,
        dataCurrentWeek: currentWeek,
        completed: false,
        calendarDone: false,
        completedDates: {},
        progress: 0,
        diaryInputs: [],
    };

    return (
        <MainContainer>
            <CHHeader
                newHabit={newHabit}
                isEnabledDate={isEnabledDate}
                isEnabledSpecific={isEnabledSpecific}
                reminderTime={reminderTime}
                habitName={habitName}
                specificDate={specificDate}
            />
            <ScrollView>
                <View style={{ marginBottom: 40 }}>
                    <Text left twentyTwo fontFamily="Bold" marginLeft="10px" marginTop="30px">
                        {habitName}
                    </Text>
                    <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                        Description
                    </Text>
                    <View style={{ flex: 1 }}>
                        <HabitInput
                            values={description}
                            actions={{
                                setValue: (text) => setDescription(text),
                            }}
                        />
                        <HabitUtilityInfoContainer>
                            <Text left fontFamily="Medium">
                                Color
                            </Text>
                            <HabitColor
                                colorUpdated={colorUpdated}
                                updatedColor={updatedColor}
                                color={color}
                                updateColor={updateColor}
                            />
                            <Frequency
                                switchStates={{
                                    isEnabledSpecific,
                                    isEnabled,
                                    isEnabledDate,
                                    isEnabledEndDate,
                                }}
                                methods={{
                                    toggleSwitchSpecific,
                                    onChangeSpecific,
                                    onChangeReminderTime,
                                    onChangeEndDate,
                                    toggleSwitch,
                                    toggleSwitchDate,
                                    toggleSwitchEndDate,
                                }}
                                setters={{
                                    setDaysCount,
                                    setSelectedValue,
                                    setTimesCount,
                                    setIsEnabledEndDate,
                                }}
                                values={{ specificDate, reminderTime, endDate }}
                                states={{ daysCount, timesCount }}
                            />
                        </HabitUtilityInfoContainer>
                    </View>
                </View>
            </ScrollView>
        </MainContainer>
    );
}
