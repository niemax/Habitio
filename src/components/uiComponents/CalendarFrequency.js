import React from 'react';
import { View } from 'react-native';
import { CalendarFrequencyContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';

const CalendarFrequency = ({ days, times, unitValue }) => (
    <CalendarFrequencyContainer>
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
    </CalendarFrequencyContainer>
);

export default CalendarFrequency;
