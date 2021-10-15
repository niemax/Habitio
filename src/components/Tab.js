import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../utils/Text';
import { TabContainer } from '../utils/StyledComponents/Styled';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function Tab({ color, tab, onPress, icon }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <TabContainer>
                {icon && <Entypo name={icon} size={26} color={color} />}
                <Text color={color} twelve fontFamily="Medium">
                    {tab.name}
                </Text>
            </TabContainer>
        </TouchableOpacity>
    );
}
