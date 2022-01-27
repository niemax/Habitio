import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarLineBreak, ModalContent } from '../../utils/StyledComponents/Styled';
import { calendarStyles } from '../../utils/globalStyles';
import { getCurrentDateFormattedForCalendarComponent } from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import CalendarStats from '../uiComponents/CalendarStats';
import Notes from '../uiComponents/Notes';
import { colors } from '../../utils/colors';
import { handleDoneOtherDay } from '../../utils/helpers/handleDone';
import { useHabits } from '../../context/HabitProvider';
import { Box, Text, useColorMode, useColorModeValue } from 'native-base';

const CalendarModal = ({ route }) => {
    const [completionRate, setCompletionRate] = useState(0);
    const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
    const { colorMode } = useColorMode();

    const { habits, habitSetter } = useHabits();

    const { data } = route.params;
    const { completedDates, days, times, unitValue, noteInputs, endDate, reminder, specificDate } =
        data;

    const calendarDayPress = (day) => {
        handleDoneOtherDay(day.dateString, data, habits, habitSetter);
    };

    return (
        <Box flex={1} bg={colorMode === 'light' ? colors.white : colors.mainBackground}>
            <FlatList
                ListFooterComponentStyle={{ marginTop: 10 }}
                ListHeaderComponent={
                    <>
                        <Box mt={32}>
                            <CalendarStats
                                completedDates={completedDates}
                                completionRate={completionRate}
                            />
                        </Box>
                        <Calendar
                            theme={{
                                calendarBackground:
                                    colorMode === 'light' ? colors.white : colors.mainBackground,
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
                        <Notes
                            notes={noteInputs}
                            editNoteModalVisible={editNoteModalVisible}
                            setEditNoteModalVisible={setEditNoteModalVisible}
                            data={data}
                        />
                    </>
                }
            />
        </Box>
    );
};

export default CalendarModal;
