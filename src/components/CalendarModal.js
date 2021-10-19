import React, { useRef, useState } from 'react';
import { Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import {
    CalendarHeader,
    CalendarLineBreak,
    CalendarStatsContainer,
    CalendarTextContainer,
    CalendarTimesInfoContainer,
    ModalContent,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { colors } from '../utils/colors';
import { calendarStyles } from '../utils/globalStyles';
import { useHabits } from '../context/HabitProvider';
import CalendarBottomSheet from './CalendarBottomSheet';

const screenWidth = Dimensions.get('window').width;

export default function CalendarModal({ calendarModalVisible, setCalendarModalVisible, data }) {
    const [diaryInput, setDiaryInput] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date());
    const { completedDates, times, name, unitValue, diaryInputs, id } = data;
    const sheetRef = useRef(null);
    const { habits, habitSetter } = useHabits();

    const calendarDayPress = (day) => {
        sheetRef.current?.show();
        setSelectedDay(day.dateString);
        console.log(selectedDay);
    };

    const handleDiaryInput = () => {
        const diaryInputObj = {
            date: selectedDay,
            input: diaryInput,
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
        <Modal animationType="slide" presentationStyle="pageSheet" visible={calendarModalVisible}>
            <ModalContent>
                <CalendarHeader>
                    <Text twentyTwo fontFamily="SemiBold">
                        {name}
                    </Text>
                    <TouchableOpacity onPress={() => setCalendarModalVisible(false)}>
                        <Text marginRight="10px" color={colors.mainGreen} fontFamily="SemiBold">
                            Done
                        </Text>
                    </TouchableOpacity>
                </CalendarHeader>
                <Calendar
                    style={{
                        marginTop: 20,
                        height: 340,
                        width: screenWidth,
                    }}
                    theme={calendarStyles}
                    firstDay={1}
                    markedDates={completedDates}
                    onDayPress={(day) => calendarDayPress(day)}
                />
                <CalendarTimesInfoContainer>
                    <Text>{data.days} days per week</Text>
                    <Text>
                        {data.times} {unitValue} per day
                    </Text>
                </CalendarTimesInfoContainer>
                <CalendarLineBreak />
                <CalendarTextContainer>
                    <CalendarStatsContainer>
                        <Text>Completions</Text>
                        <Text color={colors.mainGreen} thirtyFour>
                            {Object.keys(completedDates).length}
                        </Text>
                    </CalendarStatsContainer>
                    <CalendarStatsContainer>
                        <Text>Completion % </Text>
                        <Text color={colors.mainGreen} thirtyFour>
                            {Object.keys(completedDates).length / times}
                        </Text>
                    </CalendarStatsContainer>
                </CalendarTextContainer>
                <CalendarLineBreak />
                <ScrollView>
                    <Text left marginLeft="15px" marginTop="10px" marginBottom="10px">
                        Notes
                    </Text>
                    {Object.values(diaryInputs).length === 0 && (
                        <Text sixteen fontFamily="MediumItalic">
                            No notes added yet. Tap on a date to add a note.
                        </Text>
                    )}
                    {Object.values(diaryInputs).length > 0
                        ? Object.values(diaryInputs).map(({ date, input }) => (
                              <Text
                                  marginBottom="15px"
                                  marginLeft="15px"
                                  left
                                  fifteen
                                  fontFamily="Regular"
                              >
                                  {format(new Date(date), 'dd-MM-yyyy')} - {input}
                              </Text>
                          ))
                        : null}

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
        </Modal>
    );
}
