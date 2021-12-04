import React, { useEffect } from 'react';
import TextStyle from '../../utils/Text';
import { TextNameAndStatus } from '../../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function HabitCompletedStatusText({ name, completed, color }) {
    return (
        <TextNameAndStatus>
            <TextStyle
                color={completed ? 'gray' : 'white'}
                left
                marginLeft="15px"
                fontFamily="SemiBold"
                style={{ textDecorationLine: completed && 'line-through' }}
            >
                {name}
            </TextStyle>
            {completed ? (
                <TextStyle
                    left
                    fifteen
                    marginTop="5px"
                    marginLeft="11px"
                    fontFamily="Medium"
                    style={{ opacity: 0.7 }}
                >
                    <Feather name="check" size={15} color={color} />
                    Done
                </TextStyle>
            ) : (
                <TextStyle
                    left
                    fifteen
                    marginTop="5px"
                    marginLeft="12px"
                    fontFamily="Medium"
                    style={{ opacity: 0.7 }}
                >
                    <Feather name="x" size={15} color={color} />
                    Not done
                </TextStyle>
            )}
        </TextNameAndStatus>
    );
}
