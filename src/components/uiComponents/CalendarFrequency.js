import { Box } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import {
    formatDateForHabitEndDate,
    formatDateForHabitInfoReminder,
} from '../../utils/helpers/dateHelpers';
import { CalendarFrequencyContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';

const CalendarFrequency = ({ days, times, unitValue, endDate, reminder, specificDate }) => (
    <CalendarFrequencyContainer>
        {days > 0 && (
            <>
                <Text fontFamily="Regular" color="gray" sixteen left marginLeft="15px">
                    Frequency
                </Text>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 4 }}>
                    {days === 7 ? (
                        <Text fontFamily="Regular" sixteen>
                            Every day
                        </Text>
                    ) : (
                        <Text sixteen fontFamily="Regular">
                            {days} days per week
                        </Text>
                    )}
                    <Text>; </Text>
                    <Text fontFamily="Regular" sixteen>
                        {times} {unitValue} per day
                    </Text>
                </View>
            </>
        )}
        {endDate !== null && (
            <Box mt={4}>
                <Text fontFamily="Regular" color="gray" sixteen left marginLeft="15px">
                    End Date
                </Text>
                <Text left sixteen fontFamily="Regular" marginLeft="15px">
                    {formatDateForHabitEndDate(endDate)}
                </Text>
            </Box>
        )}
        {reminder !== null && (
            <Box mt={4}>
                <Text fontFamily="Regular" color="gray" sixteen left marginLeft="15px">
                    Reminder
                </Text>
                <Text left sixteen fontFamily="Regular" marginLeft="15px">
                    {formatDateForHabitInfoReminder(reminder)}
                </Text>
            </Box>
        )}
        {specificDate !== null && (
            <Box mt={4}>
                <Text fontFamily="Regular" color="gray" sixteen left marginLeft="15px">
                    Doing it once on
                </Text>
                <Text left sixteen fontFamily="Regular" marginLeft="15px">
                    {formatDateForHabitEndDate(specificDate)}
                </Text>
            </Box>
        )}
    </CalendarFrequencyContainer>
);

export default CalendarFrequency;
