import React from 'react';
import { CalendarTimesInfoContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';

const CalendarFrequency = ({ days, times, unitValue }) => (
    <CalendarTimesInfoContainer>
        {days === 7 ? <Text sixteen>Every day</Text> : <Text sixteen>{days} days per week</Text>}
        <Text sixteen>
            {times} {unitValue} per day
        </Text>
    </CalendarTimesInfoContainer>
);

export default CalendarFrequency;
