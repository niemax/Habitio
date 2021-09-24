import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TabContainer } from '../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';

export default function Tab({ color, tab, onPress, icon }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <TabContainer>
                <Feather name="home" size={30} color={color} />
                <Text style={{ fontSize: 14, color: color }}>{tab.name}</Text>
            </TabContainer>
        </TouchableOpacity>
    );
}
