import React from 'react';
import { colors } from '../../utils/colors';
import {
    CalendarStatsContainer,
    CalendarTimesInfoContainer,
} from '../../utils/StyledComponents/Styled';
import { FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';

const CalendarStats = ({ completedDates, completionRate, color }) => (
    <CalendarTimesInfoContainer>
        <CalendarStatsContainer>
            <MaterialCommunityIcons name="chart-arc" size={28} color={color} />
            <Text twentyEight fontFamily="Bold" marginTop="15px" color={color}>
                {Object.keys(completedDates).length}
            </Text>
            <Text marginTop="5px" sixteen>
                Completions
            </Text>
        </CalendarStatsContainer>
        <CalendarStatsContainer>
            <Feather name="calendar" size={28} color={color} />
            <Text marginTop="5px" sixteen fontFamily="Bold">
                {formatDateForHabitEndDate(new Date())}
            </Text>
        </CalendarStatsContainer>
        <CalendarStatsContainer>
            <MaterialCommunityIcons name="progress-check" size={28} color={color} />
            <Text twentyEight fontFamily="Bold" marginTop="15px" color={color}>
                {completionRate.toFixed(0)}%
            </Text>
            <Text marginTop="5px" sixteen>
                Current rate
            </Text>
        </CalendarStatsContainer>
    </CalendarTimesInfoContainer>
);

export default CalendarStats;
