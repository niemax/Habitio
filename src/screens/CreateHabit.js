import React, { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../components/ColorPalletteModal';
import { colors } from '../utils/colors';
import ActionSheet from 'react-native-actions-sheet';
import {
    CreateHabitHeader,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    MainContainer,
    SelectHabitColorButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import CreateHabitInput from '../components/HabitDescriptionInput';
import Frequency from '../components/Frequency';
import handleHabitCreation from '../utils/helpers/createhabitHelpers';

export default function CreateHabit({ navigation, route }) {
    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [daysCount, setDaysCount] = useState(1);
    const [timesCount, setTimesCount] = useState(1);
    const [loading, setLoading] = useState(false);
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

    const sheetRef = useRef(null);

    const { habitName, habitIcon, color } = route.params;

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
        id: Math.floor(Math.random() * 1000),
        color: color || updatedColor,
        icon: habitIcon,
        days: isEnabled ? daysCount : null,
        times: isEnabled ? timesCount : null,
        specificDate: isEnabledSpecific ? specificDate : null,
        reminder: isEnabledDate ? reminderTime : null,
        unitValue: selectedValue,
        description: description,
        completedDay: null,
        currentDay: 0,
        completed: false,
        completedDates: {},
        timesCompleted: 0,
        progress: 0,
        diaryInputs: [],
    };

    return (
        <MainContainer>
            <CreateHabitHeader>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={32} color="white" />
                </TouchableOpacity>
                <Text twentyTwo fontFamily="Extra">
                    Create Habit
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        handleHabitCreation(
                            newHabit,
                            setLoading,
                            isEnabledDate,
                            isEnabledSpecific,
                            CRUDHabits,
                            reminderTime,
                            habitName,
                            navigation,
                            specificDate
                        )
                    }
                >
                    {loading ? (
                        <ActivityIndicator color={colors.mainGreen} />
                    ) : (
                        <Text color={colors.mainGreen}>Create</Text>
                    )}
                </TouchableOpacity>
            </CreateHabitHeader>
            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <CreateHabitInput
                        values={description}
                        actions={{
                            setValue: (text) => setDescription(text),
                        }}
                    />
                    <HabitUtilityInfoContainer>
                        <Text left fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => sheetRef.current.show()}>
                            {!colorUpdated ? (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 100,
                                        backgroundColor: color,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 100,
                                        backgroundColor: updatedColor,
                                    }}
                                />
                            )}
                        </SelectHabitColorButton>

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
                <ActionSheet
                    containerStyle={{
                        backgroundColor: '#141414',
                        height: 270,
                    }}
                    defaultOverlayOpacity={0.3}
                    gestureEnabled="true"
                    elevation={2}
                    ref={sheetRef}
                >
                    <ColorPalletteModal
                        ref={sheetRef}
                        updateColor={updateColor}
                        sheetRef={sheetRef}
                    />
                </ActionSheet>
            </ScrollView>
        </MainContainer>
    );
}
