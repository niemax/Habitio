import React from 'react';
import { View } from 'react-native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { LineBreak } from '../../utils/StyledComponents/Styled';
import { showHabitTimerIndicator, showhabitTimerText } from '../../utils/globalStyles';

export const HabitFrequency = ({
    description,
    days,
    times,
    unitValue,
    reminder,
    specificDate,
    color,
}) => (
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
        <View style={showHabitTimerIndicator}>
            {reminder && (
                <>
                    <Feather name="clock" size={24} color={color} />
                    <Text marginLeft="5px" fontFamily="Medium">
                        {reminder && format(new Date(reminder), 'p')}
                    </Text>
                </>
            )}
            <Text marginLeft="5px" fontFamily="Bold">
                {!reminder && !specificDate && 'No reminders'}
            </Text>
        </View>
    </View>
);

export default HabitFrequency;
