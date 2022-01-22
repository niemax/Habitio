import React from 'react';
import { CalendarLineBreak, CalendarStatsContainer } from '../../utils/StyledComponents/Styled';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';
import { colors } from '../../utils/colors';

const CalendarStats = ({ completedDates }) => (
    <>
        <CalendarLineBreak />
        <CalendarStatsContainer>
            <MaterialCommunityIcons name="chart-arc" size={48} color={colors.mainGreen} />
            <Text style={{ fontSize: 38 }} fontFamily="Extra" marginTop="15px" color="gold">
                {Object.keys(completedDates).length}
            </Text>
            <Text twenty fontFamily="Extra" marginTop="15px">
                Total completions
            </Text>
        </CalendarStatsContainer>
        <CalendarLineBreak />
    </>
);

export default CalendarStats;
