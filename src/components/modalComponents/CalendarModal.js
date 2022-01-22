import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarLineBreak, ModalContent } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import { calendarStyles } from '../../utils/globalStyles';
import { useHabits } from '../../context/HabitProvider';
import NoteSheet from '../uiComponents/NoteSheet';
import {
    getCurrentDateFormattedForCalendarComponent,
    getCurrentWeek,
} from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import CalendarStats from '../uiComponents/CalendarStats';
import Notes from '../uiComponents/Notes';
import { handleDoneOtherDay } from '../../utils/helpers/handleDone';
import { colors } from '../../utils/colors';

const CalendarModal = ({ route }) => {
    const [noteInput, setNoteInput] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [completionRate, setCompletionRate] = useState(0);
    const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const { habits, habitSetter } = useHabits();

    const { data } = route.params;
    const {
        color,
        completedDates,
        days,
        dataCurrentWeek,
        name,
        times,
        unitValue,
        diaryInputs,
        id,
    } = data;

    const noteSheetRef = useRef(null);
    const actionSheetRef = useRef(null);
    const currentWeek = getCurrentWeek();

    /*  useEffect(() => {
        if (currentWeek > dataCurrentWeek) {
            setCompletionRate(0);
        } else {
            setCompletionRate(calculateCompletionRate(completedDates, days));
        }
    }, [days, dataCurrentWeek]); */

    useEffect(() => {
        if (actionSheetVisible) actionSheetRef.current.show();
    }, [selectedDay]);

    const calendarDayPress = (day) => {
        setSelectedDay(day.dateString);
        setActionSheetVisible(true);
    };

    const handleNoteInput = () => {
        const noteInputObj = {
            date: selectedDay,
            input: noteInput,
            id: Math.floor(Math.random() * 100000),
        };
        try {
            const updatedHabits = habits.map((habit) => {
                if (habit.id === id) {
                    habit.diaryInputs.push(noteInputObj);
                }
                return habit;
            });
            habitSetter(updatedHabits);
        } catch (error) {
            console.error(error);
        }
        noteSheetRef.current?.hide();
        setNoteInput('');
    };

    return (
        <ModalContent>
            <ScrollView>
                <CalendarStats
                    completedDates={completedDates}
                    completionRate={completionRate}
                    color={color}
                />
                <Calendar
                    theme={{
                        ...calendarStyles,
                        selectedDayBackgroundColor: colors.mainGreen,
                        arrowColor: colors.mainGreen,
                        todayTextColor: colors.mainGreen,
                    }}
                    firstDay={1}
                    hideExtraDays={true}
                    maxDate={getCurrentDateFormattedForCalendarComponent()}
                    markedDates={completedDates}
                    onDayPress={(day) => calendarDayPress(day)}
                />
                <CalendarFrequency days={days} times={times} unitValue={unitValue} />
                <CalendarLineBreak />
                <CalendarLineBreak />
                <Text sixteen left marginLeft="17px" marginTop="10px" marginBottom="15px">
                    Notes
                </Text>
                <Notes
                    notes={diaryInputs}
                    editNoteModalVisible={editNoteModalVisible}
                    setEditNoteModalVisible={setEditNoteModalVisible}
                    data={data}
                />
                <NoteSheet
                    data={data}
                    noteInput={noteInput}
                    noteSheetRef={noteSheetRef}
                    selectedDay={selectedDay}
                    name={name}
                    setNoteInput={setNoteInput}
                    handleNoteInput={handleNoteInput}
                />
                <ActionSheet
                    ref={actionSheetRef}
                    title={` ${selectedDay} - Select an action`}
                    options={['Completion', 'Add a note', 'Cancel']}
                    cancelButtonIndex={2}
                    userInterfaceStyle="dark"
                    onPress={(index) => {
                        if (index === 0) handleDoneOtherDay(selectedDay, data, habits, habitSetter);
                        if (index === 1) noteSheetRef.current.show();
                    }}
                />
            </ScrollView>
        </ModalContent>
    );
};

export default CalendarModal;
