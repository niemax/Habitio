import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import {
    CalendarLineBreak,
    CalendarStatsContainer,
    CalendarTextContainer,
    HabitHeaderLineBreak,
    ModalContent,
} from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import { calendarStyles } from '../../utils/globalStyles';
import { useHabits } from '../../context/HabitProvider';
import CalendarBottomSheet from '../uiComponents/CalendarBottomSheet';
import CalendarHead from '../uiComponents/CalendarHeader';
import EditNoteModal from './EditNoteModal';
import checkCurrentWeek from '../../utils/helpers/checkWeek';
import {
    formatDateForInputModal,
    getCurrentDateFormattedForCalendarComponent,
} from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import CalendarStats from '../uiComponents/CalendarStats';

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
        } catch (e) {
            console.error(e);
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
                        marginTop: 20,
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
                {Object.values(diaryInputs).length === 0 && (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text sixteen fontFamily="MediumItalic" color="gray">
                            No notes added yet. Tap on a date to add a note.
                        </Text>
                        <Entypo
                            name="pencil"
                            size={62}
                            color={colors.mainGreen}
                            style={{ marginTop: 30 }}
                        />
                    </View>
                )}
                {Object.values(diaryInputs)?.map(({ date, input, id }, index) => (
                    <View key={id}>
                        <TouchableOpacity onPress={() => setEditNoteModalVisible(index)}>
                            <Text
                                marginBottom="15px"
                                marginLeft="15px"
                                left
                                fifteen
                                fontFamily="Regular"
                            >
                                {formatDateForInputModal(date)} - {input}
                            </Text>
                        </TouchableOpacity>
                        <EditNoteModal
                            editNoteModalVisible={editNoteModalVisible === index}
                            setEditNoteModalVisible={setEditNoteModalVisible}
                            date={date}
                            id={id}
                            currentInput={input}
                            diaryInputs={diaryInputs}
                            data={data}
                        />
                    </View>
                ))}
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
