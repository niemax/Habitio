import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
    CalendarLineBreak,
    HabitHeaderLineBreak,
    ModalContent,
} from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import { calendarStyles } from '../../utils/globalStyles';
import { useHabits } from '../../context/HabitProvider';
import CalendarBottomSheet from '../uiComponents/CalendarBottomSheet';
import CalendarHead from '../uiComponents/CalendarHeader';
import checkCurrentWeek from '../../utils/helpers/checkWeek';
import { getCurrentDateFormattedForCalendarComponent } from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import ActionSheet from 'react-native-actionsheet';
import CalendarStats from '../uiComponents/CalendarStats';
import Notes from '../uiComponents/Notes';
import { handleDoneOtherDay } from '../../utils/helpers/handleDone';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CalendarModal({ route }) {
    const [noteInput, setNoteInput] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [calendarDate, setCalendarDate] = useState(null);
    const [completionRate, setCompletionRate] = useState(0);
    const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);

    const { data } = route.params;
    const { completedDates, days, dataCurrentWeek, name, times, unitValue, diaryInputs, id } = data;
    const { habits, habitSetter } = useHabits();

    const sheetRef = useRef(null);
    const actionSheetRef = useRef(null);

    useEffect(() => {
        const { completedPercentage } = checkCurrentWeek(
            dataCurrentWeek,
            completedDates,
            days,
            data
        );
        setCompletionRate(completedPercentage);
    }, [days]);

    const calendarDayPress = (day) => {
        setCalendarDate(day.dateString);
    };

    useEffect(() => {
        actionSheetRef.current?.show();
    }, [calendarDate]);

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
        sheetRef.current?.hide();
        setNoteInput('');
    };

    return (
        <ModalContent>
            <CalendarHead name={name} />
            <HabitHeaderLineBreak />
            <ScrollView>
                <Calendar
                    style={{
                        marginTop: 15,
                        height: 340,
                        width: SCREEN_WIDTH,
                    }}
                    theme={calendarStyles}
                    firstDay={1}
                    hideExtraDays={true}
                    maxDate={getCurrentDateFormattedForCalendarComponent()}
                    markedDates={completedDates}
                    onDayPress={(day) => calendarDayPress(day)}
                />
                <CalendarFrequency days={days} times={times} unitValue={unitValue} />
                <CalendarLineBreak />
                <CalendarStats completedDates={completedDates} completionRate={completionRate} />
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
                <CalendarBottomSheet
                    data={data}
                    noteInput={noteInput}
                    sheetRef={sheetRef}
                    selectedDay={selectedDay}
                    name={name}
                    setNoteInput={setNoteInput}
                    handleNoteInput={handleNoteInput}
                />
            </ScrollView>
            <ActionSheet
                ref={actionSheetRef}
                title={` ${calendarDate} - Select an action`}
                options={[`Completion`, 'Add a note', 'Cancel']}
                cancelButtonIndex={2}
                onPress={(index) => {
                    if (index === 1) sheetRef.current.show();
                    if (index === 0) handleDoneOtherDay(calendarDate, data, habits, habitSetter);
                }}
            />
        </ModalContent>
    );
}
