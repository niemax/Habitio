import React from 'react';
import { View } from 'react-native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { LineBreak } from '../../utils/StyledComponents/Styled';
import { showHabitTimerIndicator } from '../../utils/globalStyles';
import {
    formatDateForHabitEndDate,
    formatDateForHabitInfoReminder,
} from '../../utils/helpers/dateHelpers';

export const HabitInfo = ({ days, times, unitValue, reminder, specificDate, endDate, color }) => (
    <View>
        {specificDate && (
            <Text left fontFamily="Medium" marginLeft="15px" marginTop="25px">
                Doing it once on <Text color={color}>{format(new Date(specificDate), 'PP')}</Text>
            </Text>
        )}
        {specificDate !== null && <LineBreak />}
        <Text marginTop="35px" twenty marginLeft="15px" left fontFamily="Medium">
            {days === 7 ? (
                <Text twenty marginLeft="15px" left fontFamily="Medium">
                    Every day
                </Text>
            ) : (
                days > 0 && (
                    <Text twenty marginLeft="15px" left fontFamily="Medium">
                        <Text left fontFamily="Bold" twenty color={color}>
                            {days}
                        </Text>{' '}
                        times weekly
                    </Text>
                )
            )}
        </Text>
        {times > 0 && <LineBreak />}
        {times > 0 && (
            <Text marginLeft="15px" left twenty fontFamily="Medium">
                <Text left fontFamily="Bold" twenty color={color}>
                    {times}
                </Text>{' '}
                {unitValue} per day
            </Text>
        )}
        {times > 0 && <LineBreak />}
        {reminder && (
            <Text left marginLeft="15px" marginBottom="10px" fontFamily="Medium">
                Reminder
            </Text>
        )}
        {reminder && (
            <View style={showHabitTimerIndicator}>
                <Feather name="clock" size={20} color={color} />
                <Text marginLeft="5px" fontFamily="Medium">
                    {reminder && formatDateForHabitInfoReminder(reminder)}
                </Text>
            </View>
        )}
        {endDate && (
            <Text left marginLeft="15px" marginBottom="10px" fontFamily="Medium">
                Ends on
            </Text>
        )}

        {endDate && (
            <View style={showHabitTimerIndicator}>
                <Text marginLeft="5px" fontFamily="Medium" color={color}>
                    {endDate && formatDateForHabitEndDate(endDate)}
                </Text>
            </View>
        )}
    </View>
);

export default HabitInfo;
