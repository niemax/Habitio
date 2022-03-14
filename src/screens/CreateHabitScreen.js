import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { ButtonContainer } from '../utils/StyledComponents/Styled';
import HabitColor from '../components/uiComponents/SelectHabitColorButton';
import handleHabitCreation from '../utils/helpers/createhabitHelpers';
import { useHabits } from '../context/HabitProvider';
import { Box, Text } from 'native-base';
import Button from '../components/uiComponents/Button';
import MainContainer from '../components/uiComponents/MainContainer';
import Details from '../components/uiComponents/ChooseFrequency';
import ListContainer from '../components/uiComponents/ListContainer';
import { LineBreak, SettingTouchable } from './SettingsScreen';

const CreateHabit = ({ route, navigation }) => {
    const { name, habitIcon, color, habitName, defaultTimes, defaultUnit, defaultGoal } =
        route.params;
    const { CRUDHabits } = useHabits();
    const { navigate } = navigation;

    const [updatedColor, setUpdatedColor] = useState();
    const [colorUpdated, setColorUpdated] = useState(false);
    const [description, setDescription] = useState('');
    const [timesCount, setTimesCount] = useState(!!defaultTimes ? defaultTimes : 1);
    const [reminderTime, setReminderTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledDate, setIsEnabledDate] = useState(false);
    const [isEnabledEndDate, setIsEnabledEndDate] = useState(false);
    const [selectedValue, setSelectedValue] = useState(!!defaultUnit ? defaultUnit : 'Times');
    const [selectedFrequency, setSelectedFrequency] = useState('daily');
    const [weekdays, setWeekdays] = useState([]);
    const [habitNature, setHabitNature] = useState(!!defaultGoal ? defaultGoal : 'Build a habit');

    const [showModal, setShowModal] = useState(false);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitchDate = () => setIsEnabledDate((previousState) => !previousState);
    const toggleSwitchEndDate = () => setIsEnabledEndDate((previousState) => !previousState);

    const updateColor = (color) => {
        setUpdatedColor(color);
        setColorUpdated(true);
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
        color: color || updatedColor,
        icon: habitIcon,
        times: !!timesCount ? timesCount : 1,
        reminder: isEnabledDate ? reminderTime : null,
        endDate: isEnabledEndDate ? endDate : null,
        unitValue: selectedValue,
        description: description || null,
        frequency: selectedFrequency,
        selectedWeekdays: weekdays,
        habitGoal: habitNature,
    };

    const objectToDispatch = {
        newHabit,
        isEnabledDate,
        CRUDHabits,
        reminderTime,
        weekdays,
    };

    const scrollRef = useRef(null);

    return (
        <MainContainer>
            <ScrollView contentInsetAdjustmentBehavior="automatic" ref={scrollRef}>
                <Box flex={1} px={2} mb={80} mt={2}>
                    <Text fontSize="xs" ml={4} opacity={0.7}>
                        DETAILS
                    </Text>
                    <ListContainer>
                        <Box py={3}>
                            <TextInput
                                autoCorrect={false}
                                value={description}
                                clearButtonMode="always"
                                onChangeText={(text) => setDescription(text)}
                                placeholder="Description"
                            />
                        </Box>
                        <LineBreak />
                        <SettingTouchable onPress={() => setShowModal(true)}>
                            <Text fontSize="md" marginTop="15px">
                                Color
                            </Text>
                            <HabitColor
                                showModal={showModal}
                                setShowModal={setShowModal}
                                colorUpdated={colorUpdated}
                                updatedColor={updatedColor}
                                color={color}
                                updateColor={updateColor}
                            />
                        </SettingTouchable>
                    </ListContainer>
                    <Box mt={4}>
                        <Details
                            switchStates={{
                                isEnabled,
                                isEnabledDate,
                                isEnabledEndDate,
                            }}
                            methods={{
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
                            values={{ reminderTime, endDate }}
                            states={{
                                timesCount,
                                selectedValue,
                                selectedFrequency,
                                weekdays,
                                habitNature,
                                scrollRef,
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
