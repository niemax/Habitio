import React, { useRef, useState, useEffect } from 'react';
import { Modal, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format, getWeek } from 'date-fns';
import { Entypo } from '@expo/vector-icons';
import {
    CalendarLineBreak,
    CalendarStatsContainer,
    CalendarTextContainer,
    CalendarTimesInfoContainer,
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
import { useNavigation } from '@react-navigation/core';

const screenWidth = Dimensions.get('window').width;

export default function CalendarModal({ route }) {
    const [diaryInput, setDiaryInput] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [completionRate, setCompletionRate] = useState(0);
    const [editNoteModalVisible, setEditNoteModalVisible] = useState();
    const { habits, habitSetter, CRUDHabits } = useHabits();
    const sheetRef = useRef(null);
    const week = getWeek(new Date());
    const { data } = route.params;
    const { completedDates, days, dataCurrentWeek, name, unitValue, diaryInputs, id } = data;
    const navigation = useNavigation();

    useEffect(() => {
        const { completedPercentage } = checkCurrentWeek(
            dataCurrentWeek,
            completedDates,
            days,
            data
        );
        setCompletionRate(completedPercentage);
    }, [days, week]);

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
                        <Text>{data.days} days per week</Text>
                    )}
                    <Text marginRight="5px">
                        {data.times} {unitValue} per day
                    </Text>
                </CalendarTimesInfoContainer>
                <CalendarLineBreak />
                <CalendarTextContainer>
                    <CalendarStatsContainer>
                        <Text color={colors.mainGreen} thirtyFour>
                            {Object.keys(completedDates).length}
                        </Text>
                        <Text marginLeft="5px" fifteen marginTop="5px">
                            Completions
                        </Text>
                    </CalendarStatsContainer>
                    <CalendarStatsContainer>
                        <Text color={colors.mainGreen} thirtyFour>
                            {completionRate.toFixed(0)}%
                        </Text>
                        <Text marginRight="5px" fifteen marginTop="5px">
                            Completion rate{' '}
                        </Text>
                    </CalendarStatsContainer>
                </CalendarTextContainer>
                <CalendarLineBreak />
                <Text left marginLeft="20px" marginTop="10px" marginBottom="15px">
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
                {Object.values(diaryInputs).length > 0
                    ? Object.values(diaryInputs).map(({ date, input, id }, index) => {
                          return (
                              <View key={index}>
                                  <TouchableOpacity onPress={() => setEditNoteModalVisible(index)}>
                                      <Text
                                          marginBottom="15px"
                                          marginLeft="15px"
                                          left
                                          fifteen
                                          fontFamily="Regular"
                                      >
                                          {format(new Date(date), 'dd-MM-yyyy')} - {input}
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
                          );
                      })
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
    );
}
