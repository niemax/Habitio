import React from 'react';
import { CalendarTimesInfoContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';

const CalendarFrequency = ({ days, times, unitValue }) => (
    <CalendarTimesInfoContainer>
        {days === 7 ? <Text>Every day</Text> : <Text>{days} days per week</Text>}
        <Text>
            {times} {unitValue} per day
        </Text>
    </CalendarTimesInfoContainer>
);

export default CalendarFrequency;
