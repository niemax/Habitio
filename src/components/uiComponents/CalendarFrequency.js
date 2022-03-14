import React from 'react';
import { View } from 'react-native';
import { Box, Text } from 'native-base';
import {
    formatDateForHabitEndDate,
    formatDateForHabitInfoReminder,
} from '../../utils/helpers/dateHelpers';
import { CalendarFrequencyContainer } from '../../utils/StyledComponents/Styled';

const CalendarFrequency = ({
    description,
    times,
    unitValue,
    endDate,
    reminder,
    weekdays,
    frequency,
}) => {
    if (frequency === 'daily' || frequency === 'weekly')
        return (
            <CalendarFrequencyContainer>
                <Text marginLeft="15px" opacity={0.6}>
                    Frequency
                </Text>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 4 }}>
                    <Text>
                        {times} {unitValue} {frequency} on{' '}
                    </Text>
                    <Text fontWeight={600}>{weekdays?.map((weekday) => weekday).join(', ')}</Text>
                </View>
                {description && (
                    <Box mt={4}>
                        <Text marginLeft="15px" opacity={0.6}>
                            Description
                        </Text>
                        <Text marginLeft="15px">{description}</Text>
                    </Box>
                )}
                {endDate !== null && (
                    <Box mt={4}>
                        <Text marginLeft="15px" opacity={0.6}>
                            End Date
                        </Text>
                        <Text marginLeft="15px">{formatDateForHabitEndDate(endDate)}</Text>
                    </Box>
                )}
                {reminder !== null && (
                    <Box mt={4}>
                        <Text marginLeft="15px" opacity={0.6}>
                            Reminder
                        </Text>
                        <Text marginLeft="15px">{formatDateForHabitInfoReminder(reminder)}</Text>
                    </Box>
                )}
            </CalendarFrequencyContainer>
        );
    return (
        <CalendarFrequencyContainer>
            <Box>
                <Text marginLeft="15px" opacity={0.6}>
                    Frequency
                </Text>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 4 }}>
                    <Text>
                        {times} {unitValue} {frequency}
                    </Text>
                    <Text fontWeight={600}>{weekdays?.map((weekday) => weekday).join(', ')}</Text>
                </View>
                {description && (
                    <Box mt={4}>
                        <Text marginLeft="15px" opacity={0.6}>
                            Description
                        </Text>
                        <Text marginLeft="15px">{description}</Text>
                    </Box>
                )}
                {endDate !== null && (
                    <Box mt={4}>
                        <Text marginLeft="15px" opacity={0.6}>
                            End Date
                        </Text>
                        <Text marginLeft="15px">{formatDateForHabitEndDate(endDate)}</Text>
                    </Box>
                )}
            </Box>
        </CalendarFrequencyContainer>
    );
};

export default CalendarFrequency;
