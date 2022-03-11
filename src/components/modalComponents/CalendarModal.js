import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { calendarStyles } from '../../utils/globalStyles';
import {
    getCurrentDateFormattedForCalendarComponent,
    formatDateForHabitEndDate,
} from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import CalendarStats from '../uiComponents/CalendarStats';
import { Entypo } from '@expo/vector-icons';
import { handleDoneOtherDay } from '../../utils/helpers/handleDone';
import { useHabits } from '../../context/HabitProvider';
import { Box, Center, Text, useColorMode } from 'native-base';
import MainContainer from '../uiComponents/MainContainer';
import useSettings from '../../hooks/useSettings';

const CalendarModal = ({ route, navigation }) => {
    const [noteRenderAmount, setNoteRenderAmount] = useState(2);
    const { colorMode } = useColorMode();
    const { navigate } = navigation;

    const { colors, color } = useSettings();

    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habitItem = getSpecificHabit(route.params.id);

    const isSelectedDaily = habitItem.frequency === 'daily';

    const calendarDayPress = (day) => {
        const date = day.dateString;
        const id = route.params.id;
        handleDoneOtherDay(date, id, habits, habitSetter);
    };

    const renderNoteItem = ({ item, index }) =>
        index <= noteRenderAmount && (
            <View key={item.id}>
                <TouchableOpacity
                    onPress={() =>
                        navigate('EditNote', {
                            input: item.input,
                            date: formatDateForHabitEndDate(item.date),
                            id: item.id,
                            allNotes: habitItem.noteInputs,
                            habitId: habitItem.id,
                        })
                    }
                >
                    <Text
                        fontWeight={700}
                        color={colors.mainColor}
                        marginLeft="15px"
                        marginBottom="3px"
                    >
                        {formatDateForHabitEndDate(item.date)}
                    </Text>
                    <Text numberOfLines={1} marginBottom="15px" marginLeft="15px">
                        {item.input}
                    </Text>
                </TouchableOpacity>
            </View>
        );

    const renderHeader = () => (
        <>
            <Box mt={32}>
                <CalendarStats
                    completedDates={habitItem.completedDates}
                    streak={habitItem.streak}
                />
            </Box>
            <Calendar
                theme={{
                    calendarBackground:
                        colorMode === 'light' ? colors.white : colors.mainBackground,
                    monthTextColor: colorMode === 'light' ? 'black' : 'white',
                    dayTextColor: colorMode === 'light' ? 'black' : 'white',
                    selectedDayBackgroundColor: color,
                    arrowColor: color,
                    todayTextColor: color,
                    indicatorColor: color,
                    ...calendarStyles,
                }}
                firstDay={1}
                hideExtraDays={true}
                maxDate={getCurrentDateFormattedForCalendarComponent()}
                markedDates={habitItem.completedDates}
                onDayPress={(day) => calendarDayPress(day)}
            />
            <CalendarFrequency
                description={habitItem.description}
                days={habitItem.days}
                times={habitItem.times}
                unitValue={habitItem.unitValue}
                endDate={habitItem.endDate}
                reminder={habitItem.reminder}
                isSelectedDaily={isSelectedDaily}
                weekdays={habitItem.selectedWeekdays}
            />
            <CalendarLineBreak />
        </>
    );

    const renderFooter = () => (
        <>
            <Text marginLeft="15px" marginBottom="15px" opacity={0.7}>
                Notes
            </Text>
            {Object.values(habitItem.noteInputs).length === 0 && (
                <Center>
                    <Text fontSize="md" color="gray.500">
                        No notes added yet
                    </Text>
                    <Entypo
                        name="pencil"
                        size={62}
                        color={colors.mainColor}
                        style={{ marginTop: 30 }}
                    />
                </Center>
            )}
            <FlatList
                lazy
                data={Object.values(habitItem.noteInputs).sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                )}
                renderItem={renderNoteItem}
                keyExtractor={({ id }) => id}
                ListFooterComponent={
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setNoteRenderAmount(noteRenderAmount + 3);
                            }}
                        >
                            {habitItem.noteInputs.length > noteRenderAmount && (
                                <Text textAlign="center">Load more</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );

    return (
        <MainContainer>
            <FlatList
                ListFooterComponentStyle={{ marginTop: 10 }}
                ListHeaderComponent={renderHeader()}
                ListFooterComponent={renderFooter()}
            />
        </MainContainer>
    );
};

export default CalendarModal;
