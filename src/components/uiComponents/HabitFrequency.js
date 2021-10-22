import React from 'react';
import { View } from 'react-native';
import Text from '../../utils/Text';
import { LineBreak } from '../../utils/StyledComponents/Styled';

export const HabitFrequency = ({ description, days, times, unitValue }) => (
    <View>
        <Text marginTop="10px" color="gray">
            {description}
        </Text>
        <Text marginTop="35px" twenty marginLeft="15px" left fontFamily="Medium">
            {days === 7 ? (
                <Text twenty marginLeft="15px" left fontFamily="Medium">
                    Every day
                </Text>
            ) : (
                days !== null && (
                    <Text twenty marginLeft="15px" left fontFamily="Medium">
                        {days} times weekly
                    </Text>
                )
            )}
        </Text>
        <LineBreak />
        {times !== null && (
            <Text marginLeft="15px" left twenty fontFamily="Medium">
                {times} {unitValue} per day
            </Text>
        )}
        <LineBreak />
    </View>
);

export default HabitFrequency;
