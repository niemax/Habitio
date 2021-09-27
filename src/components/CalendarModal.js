import React, { useState } from 'react';
import { Modal, View, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import {
    CalendarTextContainer,
    CreateHabitHeader,
    ModalContent,
    VerticalLineBreak,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { colors } from '../utils/colors';
import { calendarStyles } from '../utils/globalStyles';

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
    const { completedDates } = data;
    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={calendarModalVisible}>
            <ModalContent>
                <CreateHabitHeader>
                    <Text twenty fontFamily="SemiBold">
                        {data.name}
                    </Text>
                    <TouchableOpacity onPress={() => setCalendarModalVisible(false)}>
                        <Text
                            twenty
                            marginRight="15px"
                            color={colors.mainGreen}
                            fontFamily="SemiBold"
                        >
                            Done
                        </Text>
                    </TouchableOpacity>
                </CreateHabitHeader>
                <Calendar
                    style={{
                        marginTop: 35,
                        height: 350,
                        width: screenWidth,
                    }}
                    theme={calendarStyles}
                    markingType="custom"
                    markedDates={completedDates}
                />
                <CalendarTextContainer>
                    <Text marginLeft="15px" twenty left>
                        Total Completions
                    </Text>
                    <Text marginLeft="90px" left color={colors.mainGreen} thirtyFour>
                        {Object.keys(completedDates).length}
                    </Text>
                </CalendarTextContainer>
            </ModalContent>
        </Modal>
    );
}
