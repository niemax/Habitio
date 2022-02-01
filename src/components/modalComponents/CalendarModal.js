import React, { useState } from 'react';
import { Alert, FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { calendarStyles } from '../../utils/globalStyles';
import {
    getCurrentDateFormattedForCalendarComponent,
    formatDateForHabitEndDate,
} from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import CalendarStats from '../uiComponents/CalendarStats';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { handleDoneOtherDay } from '../../utils/helpers/handleDone';
import { useHabits } from '../../context/HabitProvider';
import {
    Box,
    Center,
    Flex,
    Modal,
    NativeBaseProvider,
    Text,
    useColorMode,
    Button,
} from 'native-base';
import { handleNoteDelete, handleNoteEdit } from '../../utils/helpers/noteMethods';
import theme from '../../theme';

const Input = ({ input, noteId, habitId, setShowModal, inputs }) => {
    const [inputText, setInputText] = useState(input);
    const { habits, habitSetter } = useHabits();
    const { colorMode } = useColorMode();

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () => handleNoteDelete(habitId, noteId, habits, inputs, habitSetter),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <Box p={3}>
            <Flex direction="row" align="baseline" justify="center" mb={2}>
                <Text fontSize="lg" fontWeight={700} marginTop="10px">
                    Edit Note
                </Text>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 2, top: 2 }}
                    onPress={() => displayDeleteAlert()}
                >
                    <Ionicons name="trash-outline" size={28} color={colors.error} />
                </TouchableOpacity>
            </Flex>
            <TextInput
                multiline={Platform.OS === 'android' ? false : true}
                autoCorrect={false}
                value={inputText}
                style={{
                    borderRadius: 20,
                    backgroundColor: colorMode === 'light' ? 'white' : colors.black,
                    padding: 15,
                    color: colorMode === 'light' ? 'black' : 'white',
                    height: 220,
                    fontSize: 16,
                }}
                onChangeText={(text) => setInputText(text)}
            />
            <Flex
                direction="row"
                bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                justify="space-around"
                mb={4}
                mt={4}
            >
                <Button.Group colorScheme="indigo" space={2}>
                    <Button
                        size="lg"
                        bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                        rounded="xl"
                        w={150}
                        h={50}
                        variant="subtle"
                        onPress={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        w={150}
                        h={50}
                        variant="subtle"
                        rounded="xl"
                        onPress={() => {
                            handleNoteEdit(inputs, noteId, habitSetter, habits, inputText);
                            setShowModal(false);
                        }}
                    >
                        Done
                    </Button>
                </Button.Group>
            </Flex>
        </Box>
    );
};

const CalendarModal = ({ route }) => {
    const [completionRate, setCompletionRate] = useState(0);
    const [noteRenderAmount, setNoteRenderAmount] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const { colorMode } = useColorMode();

    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habit = getSpecificHabit(route.params.id);
    const habitItem = habit[0];

    const {
        id,
        completedDates,
        days,
        times,
        unitValue,
        noteInputs,
        endDate,
        reminder,
        specificDate,
        streak,
    } = habitItem;

    const calendarDayPress = (day) => {
        handleDoneOtherDay(day.dateString, route.params.id, habits, habitSetter);
    };

    const renderNoteItem = ({ item, index }) =>
        index <= noteRenderAmount && (
            <View key={item.id}>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text
                        fontWeight={700}
                        color={colors.mainPurple}
                        marginLeft="15px"
                        marginBottom="3px"
                    >
                        {formatDateForHabitEndDate(item.date)}
                    </Text>
                    <Text numberOfLines={1} marginBottom="15px" marginLeft="15px">
                        {item.input}
                    </Text>
                </TouchableOpacity>
                <Modal
                    size="xl"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    avoidKeyboard
                    animationPreset="slide"
                >
                    <Modal.Content
                        maxWidth="400px"
                        bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                        rounded="2xl"
                    >
                        <Input
                            input={item.input}
                            noteId={item.id}
                            habitId={id}
                            setShowModal={setShowModal}
                            inputs={noteInputs}
                        />
                    </Modal.Content>
                </Modal>
            </View>
        );

    return (
        <NativeBaseProvider theme={theme}>
            <Box flex={1} bg={colorMode === 'light' ? colors.white : colors.mainBackground}>
                <FlatList
                    ListFooterComponentStyle={{ marginTop: 10 }}
                    ListHeaderComponent={
                        <>
                            <Box mt={32}>
                                <CalendarStats
                                    completedDates={completedDates}
                                    completionRate={completionRate}
                                    streak={streak}
                                />
                            </Box>
                            <Calendar
                                theme={{
                                    calendarBackground:
                                        colorMode === 'light'
                                            ? colors.white
                                            : colors.mainBackground,
                                    monthTextColor: colorMode === 'light' ? 'black' : 'white',
                                    dayTextColor: colorMode === 'light' ? 'black' : 'white',
                                    selectedDayBackgroundColor: colors.mainPurple,
                                    arrowColor: colors.mainPurple,
                                    todayTextColor: colors.mainPurple,
                                    ...calendarStyles,
                                }}
                                firstDay={1}
                                hideExtraDays={true}
                                maxDate={getCurrentDateFormattedForCalendarComponent()}
                                markedDates={completedDates}
                                onDayPress={(day) => calendarDayPress(day)}
                            />
                            <CalendarFrequency
                                days={days}
                                times={times}
                                unitValue={unitValue}
                                endDate={endDate}
                                reminder={reminder}
                                specificDate={specificDate}
                            />
                            <CalendarLineBreak />
                        </>
                    }
                    ListFooterComponent={
                        <>
                            <Text marginLeft="17px" marginBottom="15px">
                                Notes
                            </Text>
                            <>
                                {Object.values(noteInputs).length === 0 && (
                                    <Center>
                                        <Text fontSize="md" color="gray.500">
                                            {' '}
                                            No notes added yet.
                                        </Text>
                                        <Entypo
                                            name="pencil"
                                            size={62}
                                            color={colors.mainPurple}
                                            style={{ marginTop: 30 }}
                                        />
                                    </Center>
                                )}
                                <FlatList
                                    lazy
                                    data={Object.values(noteInputs).sort(
                                        (a, b) => new Date(b.date) - new Date(a.date)
                                    )}
                                    renderItem={renderNoteItem}
                                    keyExtractor={(item) => item.id}
                                    ListFooterComponent={
                                        <View style={{ marginBottom: 50 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setNoteRenderAmount(noteRenderAmount + 3);
                                                }}
                                            >
                                                {noteInputs.length >= noteRenderAmount && (
                                                    <Text textAlign="center">Load more</Text>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </>
                        </>
                    }
                />
            </Box>
        </NativeBaseProvider>
    );
};

export default CalendarModal;
