import React from 'react';
import { colors } from '../../utils/colors';
import {
    CalendarStatsContainer,
    CalendarTimesInfoContainer,
} from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';

const CalendarStats = ({ completedDates, completionRate }) => (
    <CalendarTimesInfoContainer>
        <CalendarStatsContainer>
            <Text color={colors.mainGreen} thirtyFour>
                {Object.keys(completedDates).length}
            </Text>
            <Text marginTop="5px">Completions</Text>
        </CalendarStatsContainer>
        <CalendarStatsContainer>
            <Text color={colors.mainGreen} thirtyFour>
                {completionRate.toFixed(0)}%
            </Text>
            <Text marginTop="5px">Current rate</Text>
        </CalendarStatsContainer>
    </CalendarTimesInfoContainer>
);

export default CalendarStats;
