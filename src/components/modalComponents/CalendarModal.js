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
import CalendarStats from '../uiComponents/CalendarStats';
import Notes from '../uiComponents/Notes';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CalendarModal({ route }) {
    const [diaryInput, setDiaryInput] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [completionRate, setCompletionRate] = useState(0);
    const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);

    const { data } = route.params;
    const { completedDates, days, dataCurrentWeek, name, times, unitValue, diaryInputs, id } = data;
    const { habits, habitSetter } = useHabits();
    const sheetRef = useRef(null);

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
        sheetRef.current?.show();
        setSelectedDay(day.dateString);
    };

    const handleDiaryInput = () => {
        const diaryInputObj = {
            date: selectedDay,
            input: diaryInput,
            id: Math.floor(Math.random() * 10000),
        };
        try {
            const updatedHabits = habits.map((habit) => {
                if (habit.id === id) {
                    habit.diaryInputs.push(diaryInputObj);
                }
                return habit;
            });
            habitSetter(updatedHabits);
        } catch (error) {
            console.error(error);
        }
        sheetRef.current?.hide();
        setDiaryInput('');
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
                <Text left marginLeft="17px" marginTop="10px" marginBottom="15px">
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
                    diaryInput={diaryInput}
                    sheetRef={sheetRef}
                    selectedDay={selectedDay}
                    name={name}
                    setDiaryInput={setDiaryInput}
                    handleDiaryInput={handleDiaryInput}
                />
            </ScrollView>
        </ModalContent>
    );
}
