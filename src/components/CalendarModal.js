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
    const { habits, habitSetter } = useHabits();
    const sheetRef = useRef(null);
    const { completedDates, times, name, unitValue, diaryInputs, id } = data;
    const completedLength = Object.keys(completedDates).length;
    const completionRate = ((completedLength / times) * 100) / times;

    const calendarDayPress = (day) => {
        sheetRef.current?.show();
        setSelectedDay(day.dateString);
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
                    <Text marginLeft="5px" twentyTwo fontFamily="SemiBold">
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
                    {data.days === 7 ? (
                        <Text>Every day</Text>
                    ) : (
                        <Text marginLeft="5px">{data.days} days per week</Text>
                    )}
                    <Text marginRight="5px">
                        {data.times} {unitValue} per day
                    </Text>
                </CalendarTimesInfoContainer>
                <CalendarLineBreak />
                <CalendarTextContainer>
                    <CalendarStatsContainer>
                        <Text marginLeft="5px">Completions</Text>
                        <Text color={colors.mainGreen} thirtyFour>
                            {Object.keys(completedDates).length}
                        </Text>
                    </CalendarStatsContainer>
                    <CalendarStatsContainer>
                        <Text marginRight="5px">Completion % </Text>
                        <Text color={colors.mainGreen} thirtyFour>
                            {completionRate.toFixed(0)}
                        </Text>
                    </CalendarStatsContainer>
                </CalendarTextContainer>
                <CalendarLineBreak />
                <ScrollView>
                    <Text left marginLeft="20px" marginTop="10px" marginBottom="15px">
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
