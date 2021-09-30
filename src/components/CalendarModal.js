import React, { useState, useEffect } from 'react';
import { Modal, View, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import {
    CalendarHeader,
    CalendarLineBreak,
    CalendarStatsContainer,
    CalendarTextContainer,
    CalendarTimesInfoContainer,
    CreateHabitHeader,
    ModalContent,
    VerticalLineBreak,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { colors } from '../utils/colors';
import { calendarStyles } from '../utils/globalStyles';
import { useHabits } from '../context/HabitProvider';

LocaleConfig.locales.fi = {
    monthNames: [
        'Tammikuu',
        'Helmikuu',
        'Maaliskuu',
        'Huhtikuu',
        'Toukokuu',
        'Kesäkuu',
        'Heinäkuu',
        'Elokuu',
        'Syyskuu',
        'Lokakuu',
        'Marraskuu',
        'Joulukuu',
    ],
    monthNamesShort: [
        'Tammi.',
        'Helmu.',
        'Maalis.',
        'Huhti.',
        'Touko.',
        'Kesä',
        'Heinä.',
        'Elo',
        'Syys',
        'Loka',
        'Marras',
        'Joulu',
    ],
    dayNames: [
        'Sunnuntai',
        'Tiistai',
        'Keskiviikko',
        'Torstai',
        'Perjantai',
        'Lauantai',
        'Maanantai',
    ],
    dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
    today: 'Tänään',
};
LocaleConfig.defaultLocale = 'fi';

const screenWidth = Dimensions.get('window').width;

export default function CalendarModal({ calendarModalVisible, setCalendarModalVisible, data }) {
    const { completedDates, times, name } = data;
    const { getHabits } = useHabits();

    useEffect(() => {
        getHabits();
    }, [data]);

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
                        marginTop: 35,
                        height: 350,
                        width: screenWidth,
                    }}
                    theme={calendarStyles}
                    markingType="custom"
                    firstDay={1}
                    markedDates={completedDates}
                />
                <CalendarTimesInfoContainer>
                    <Text>{data.days} days per week</Text>
                    <Text>{data.times} times per day</Text>
                </CalendarTimesInfoContainer>
                <CalendarLineBreak />
                <CalendarTextContainer>
                    <CalendarStatsContainer>
                        <Text left>Completions</Text>
                        <Text color={colors.mainGreen} thirtyFour>
                            {Object.keys(completedDates).length}
                        </Text>
                    </CalendarStatsContainer>
                    <CalendarStatsContainer>
                        <Text>Completion %</Text>
                        <Text color={colors.mainGreen} thirtyFour>
                            {Object.keys(completedDates.length / times) * 100}%
                        </Text>
                    </CalendarStatsContainer>
                </CalendarTextContainer>
            </ModalContent>
        </Modal>
    );
}
