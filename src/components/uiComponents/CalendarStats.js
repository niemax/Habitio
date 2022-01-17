import React from 'react';
import {
    CalendarStatsContainer,
    CalendarTimesInfoContainer,
} from '../../utils/StyledComponents/Styled';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';

const CalendarStats = ({ completedDates, completionRate, color }) => (
    <CalendarTimesInfoContainer>
        <CalendarStatsContainer>
            <MaterialCommunityIcons name="chart-arc" size={32} color={color} />
            <Text twentyEight fontFamily="Medium" marginTop="15px" color={color}>
                {Object.keys(completedDates).length}
            </Text>
            <Text marginTop="5px" sixteen>
                Total
            </Text>
        </CalendarStatsContainer>
        <CalendarStatsContainer>
            <Text fontFamily="Bold" color={color}>
                Today{' '}
            </Text>
            <Text marginTop="5px" sixteen fontFamily="Medium">
                {formatDateForHabitEndDate(new Date())}
            </Text>
        </CalendarStatsContainer>
        <CalendarStatsContainer>
            <MaterialCommunityIcons name="progress-check" size={28} color={color} />
            <Text twentyEight fontFamily="Medium" marginTop="15px" color={color}>
                {completionRate.toFixed(0)}%
            </Text>
            <Text marginTop="5px" sixteen>
                Current
            </Text>
        </CalendarStatsContainer>
    </CalendarTimesInfoContainer>
);

export default CalendarStats;
