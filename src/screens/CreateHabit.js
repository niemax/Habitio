import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
    ButtonContainer,
    CreateHabitButton,
    MainContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import HabitInput from '../components/uiComponents/HabitDescriptionInput';
import Frequency from '../components/uiComponents/ChooseFrequency';
import HabitColor from '../components/uiComponents/SelectHabitColorButton';
import { getCurrentWeek } from '../utils/helpers/dateHelpers';
import handleHabitCreation from '../utils/helpers/createhabitHelpers';
import { useHabits } from '../context/HabitProvider';
import { Box, Flex } from 'native-base';

const CreateHabit = ({ route, navigation }) => {
    const { name, habitIcon, color, habitName } = route.params;

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

    const { CRUDHabits } = useHabits();

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
        <MainContainer>
            <ScrollView>
                <Box flex={1} mt={0} px={2} mb={32}>
                    <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px" sixteen>
                        Description
                    </Text>
                    <HabitInput
                        values={description}
                        actions={{
                            setValue: (text) => setDescription(text),
                        }}
                    />
                    <Flex direction="row" align="center">
                        <Text left fontFamily="Medium" marginLeft="10px" sixteen>
                            Color
                        </Text>
                        <HabitColor
                            colorUpdated={colorUpdated}
                            updatedColor={updatedColor}
                            color={color}
                            updateColor={updateColor}
                        />
                    </Flex>
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
                            states={{ daysCount, timesCount }}
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
                    <Text twentyTwo>Create</Text>
                </CreateHabitButton>
            </ButtonContainer>
        </MainContainer>
    );
};

export default CreateHabit;
