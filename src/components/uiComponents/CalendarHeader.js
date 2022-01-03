import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import { CalendarHeader } from '../../utils/StyledComponents/Styled';
import { useNavigation } from '@react-navigation/core';

const CalendarHead = ({ name, color }) => {
    const navigation = useNavigation();
    return (
        <CalendarHeader>
            <Text marginLeft="5px" nineteen fontFamily="Bold">
                {name}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text nineteen marginRight="10px" color={color} fontFamily="SemiBold">
                    Done
                </Text>
            </TouchableOpacity>
        </CalendarHeader>
    );
};

export default CalendarHead;
