import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TabContainer } from '../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';

export default function Tab({ color, tab, onPress, icon }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <TabContainer>
                <Feather name="calendar" size={28} color="white" />
                <Text style={{ fontSize: 13, color: color }}>{tab.name}</Text>
            </TabContainer>
        </TouchableOpacity>
    );
}
