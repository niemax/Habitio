import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ButtonContainer } from '../utils/StyledComponents/Styled';
import HabitInput from '../components/uiComponents/HabitDescriptionInput';
import HabitColor from '../components/uiComponents/SelectHabitColorButton';
import { getCurrentDay, getCurrentMonth, getCurrentWeek } from '../utils/helpers/dateHelpers';
import handleHabitCreation from '../utils/helpers/createhabitHelpers';
import { useHabits } from '../context/HabitProvider';
import { Box, Text } from 'native-base';
import Button from '../components/uiComponents/Button';
import MainContainer from '../components/uiComponents/MainContainer';
import Details from '../components/uiComponents/ChooseFrequency';

const currentWeek = getCurrentWeek();

const CreateHabit = ({ route, navigation }) => {
    const { name, habitIcon, color, habitName } = route.params;
    const { CRUDHabits } = useHabits();
    const { navigate } = navigation;

    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [timesCount, setTimesCount] = useState(1);
    const [specificDate, setSpecificDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledSpecific, setIsEnabledSpecific] = useState(false);
    const [isEnabledEndDate, setIsEnabledEndDate] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Times');
    const [selectedFrequency, setSelectedFrequency] = useState('weekly');
    const [weekdays, setWeekdays] = useState([]);
    const [habitNature, setHabitNature] = useState('Build a habit');

    const toggleSwitch = () =>
        !isEnabledSpecific && setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () =>
        !isEnabledSpecific && setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchSpecific = () =>
        !isEnabledDate && !isEnabled && setIsEnabledSpecific((previousState) => !previousState);
    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);

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

    const currentDay = getCurrentDay();
    const currentMonth = getCurrentMonth();

    const newHabit = {
        name: name || habitName,
        id: Math.floor(Math.random() * 10000),
        color: color || updatedColor,
        icon: habitIcon,
        times: selectedFrequency !== 'monthly' ? timesCount : 0,
        specificDate: isEnabledSpecific ? specificDate : null,
        reminder: isEnabledDate ? reminderTime : null,
        endDate: isEnabledEndDate ? endDate : null,
        unitValue: selectedValue,
        description: description || null,
        dataCurrentDay: currentDay,
        dataCurrentWeek: currentWeek,
        dataCurrentMonth: currentMonth,
        completed: false,
        calendarDone: false,
        completedDates: {},
        progress: 0,
        noteInputs: [],
        streak: [],
        frequency: !!isEnabledSpecific ? 'once' : selectedFrequency,
        timesDoneThisWeek: 0,
        selectedWeekdays: weekdays,
        habitGoal: habitNature,
    };

    const objectToDispatch = {
        newHabit,
        isEnabledDate,
        isEnabledSpecific,
        CRUDHabits,
        reminderTime,
        specificDate,
    };

    return (
        <MainContainer>
            <ScrollView>
                <Box flex={1} mt={24} px={2} mb={32}>
                    <Text fontSize="xs" marginLeft="10px" marginTop="35px" opacity={0.7}>
                        DESCRIPTION
                    </Text>
                    <HabitInput
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
                        <Details
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
                                setSelectedValue,
                                setTimesCount,
                                setIsEnabledEndDate,
                                setSelectedFrequency,
                                setWeekdays,
                                setHabitNature,
                            }}
                            values={{ specificDate, reminderTime, endDate }}
                            states={{
                                timesCount,
                                selectedValue,
                                selectedFrequency,
                                weekdays,
                                habitNature,
                            }}
                        />
                    </Box>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <Button
                    w="100%"
                    h={60}
                    onPress={() => {
                        handleHabitCreation(objectToDispatch);
                        navigate('Dashboard');
                    }}
                >
                    Create
                </Button>
            </ButtonContainer>
        </MainContainer>
    );
};

export default CreateHabit;
