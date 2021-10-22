import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import { CalendarHeader } from '../../utils/StyledComponents/Styled';

const CalendarHead = ({ name, setCalendarModalVisible }) => (
    <CalendarHeader>
        <Text marginLeft="5px" twentyTwo fontFamily="SemiBold">
            {name}
        </Text>
        <TouchableOpacity onPress={() => setCalendarModalVisible(false)}>
            <Text marginRight="10px" color={colors.mainGreen} fontFamily="SemiBold">
                Done
            </Text>
        </TouchableOpacity>
    </CalendarHeader>
);

export default CalendarHead;
