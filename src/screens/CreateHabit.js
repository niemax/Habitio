import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ButtonContainer, CreateHabitButton } from '../utils/StyledComponents/Styled';
import HabitInput from '../components/uiComponents/HabitDescriptionInput';
import Frequency from '../components/uiComponents/ChooseFrequency';
import HabitColor from '../components/uiComponents/SelectHabitColorButton';
import { getCurrentWeek } from '../utils/helpers/dateHelpers';
import handleHabitCreation from '../utils/helpers/createhabitHelpers';
import { useHabits } from '../context/HabitProvider';
import { Box, Text, useColorModeValue } from 'native-base';
import { colors } from '../utils/colors';

const CreateHabit = ({ route, navigation }) => {
    const { name, habitIcon, color, habitName } = route.params;
    const { CRUDHabits } = useHabits();
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

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);
    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);

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
        name: name || habitName,
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
        noteInputs: [],
    };

    return (
        <Box flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)} align="center">
            <ScrollView>
                <Box flex={1} mt={32} px={2} mb={32}>
                    <Text fontSize="xs" marginLeft="10px" marginTop="35px" opacity={0.7}>
                        DESCRIPTION
                    </Text>
                    <HabitInput
                        values={description}
                        actions={{
                            setValue: (text) => setDescription(text),
                        }}
                    />
                    <Box>
                        <Text fontSize="xs" marginLeft="15px" opacity={0.7}>
                            COLOR
                        </Text>
                        <HabitColor
                            colorUpdated={colorUpdated}
                            updatedColor={updatedColor}
                            color={color}
                            updateColor={updateColor}
                        />
                    </Box>
                    <Box mt={4}>
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
                            states={{ daysCount, timesCount, selectedValue }}
                        />
                    </Box>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <CreateHabitButton
                    onPress={() => {
                        handleHabitCreation(
                            newHabit,
                            isEnabledDate,
                            isEnabledSpecific,
                            CRUDHabits,
                            reminderTime,
                            name,
                            specificDate
                        );
                        navigation.navigate('Homepage');
                    }}
                >
                    <Text fontSize="xl" fontWeight={600} color="black">
                        Create
                    </Text>
                </CreateHabitButton>
            </ButtonContainer>
        </Box>
    );
};

export default CreateHabit;
