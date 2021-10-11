import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../utils/Text';
import { ModalContent } from '../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
import { habitSelectionColors } from '../utils/colors';

export default function ColorPalletteModal({ sheetRef, updateColor }) {
    return (
        <ModalContent>
            <View
                style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                }}
            >
                {habitSelectionColors.map((item, index) => (
                    <View key={index.toString()} style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                sheetRef.current.hide();
                                updateColor(item);
                            }}
                            style={{
                                margin: 5,
                                width: 35,
                                height: 35,
                                borderRadius: '50%',
                                backgroundColor: `${item}`,
                                marginVertical: 20,
                            }}
                        />
                    </View>
                ))}
            </View>
        </ModalContent>
    );
}
