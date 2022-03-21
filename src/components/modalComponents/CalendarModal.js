import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarLineBreak } from '../../utils/StyledComponents/Styled';
import { calendarStyles } from '../../utils/globalStyles';
import {
    formatDateForHabitEndDate,
    getCurrentDateFormattedForCalendarComponent,
} from '../../utils/helpers/dateHelpers';
import CalendarFrequency from '../uiComponents/CalendarFrequency';
import CalendarStats from '../uiComponents/CalendarStats';
import { Entypo } from '@expo/vector-icons';
import { handleDoneOtherDay } from '../../utils/helpers/handleDone';
import { useHabits } from '../../context/HabitProvider';
import { Box, Center, Flex, Text, useColorMode } from 'native-base';
import MainContainer from '../uiComponents/MainContainer';
import useSettings from '../../hooks/useSettings';

const CalendarModal = ({ route, navigation }) => {
    const { colorMode } = useColorMode();
    const { navigate } = navigation;

    const { colors } = useSettings();

    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habitItem = getSpecificHabit(route.params.id);

    const isSelectedDaily = habitItem.frequency === 'daily';

    const calendarDayPress = (day) => {
        const date = day.dateString;
        const id = route.params.id;
        handleDoneOtherDay(date, id, habits, habitSetter);
    };

    const renderNoteItem = ({ item }) => (
        <View key={item.id} style={{ marginTop: 20 }}>
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
                <Flex direction="row" justify="space-between" px={4}>
                    <Text numberOfLines={1} marginBottom="10px">
                        {item.input}
                    </Text>
                    <Text fontWeight={700} color={colors.mainColor}>
                        {formatDateForHabitEndDate(item.date)}
                    </Text>
                </Flex>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <>
            <Box mt={20}>
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
                    selectedDayBackgroundColor: colors.mainColor,
                    arrowColor: colors.mainColor,
                    todayTextColor: colors.mainColor,
                    dotColor: colors.mainColor,
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
                frequency={habitItem.frequency}
            />
            <CalendarLineBreak />
        </>
    );

    const ItemSeparatorComponent = () => (
        <View
            style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.4,
                opacity: 0.4,
                marginTop: 5,
                width: '100%',
            }}
        />
    );

    const sortedNotes = Object.values(habitItem.noteInputs).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
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
                data={sortedNotes}
                renderItem={renderNoteItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                keyExtractor={({ id }) => id}
            />
        </>
    );

    return (
        <MainContainer>
            <FlatList
                ListFooterComponentStyle={{ marginTop: 10, marginBottom: 30 }}
                ListHeaderComponent={renderHeader()}
                ListFooterComponent={renderFooter()}
            />
        </MainContainer>
    );
};

export default CalendarModal;
