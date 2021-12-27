import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ModalContent } from '../../utils/StyledComponents/Styled';
import { habitSelectionColors as colors } from '../../utils/colors';
import { colorPalletteColor, colorPalletteView } from '../../utils/globalStyles';

export default function ColorPalletteModal({ sheetRef, updateColor }) {
    return (
        <ModalContent>
            <View style={colorPalletteView}>
                {colors.map((item, index) => (
                    <View key={index.toString()}>
                        <TouchableOpacity
                            onPress={() => {
                                sheetRef.current?.hide();
                                updateColor(item);
                            }}
                            style={{
                                backgroundColor: item,
                                ...colorPalletteColor,
                            }}
                        />
                    </View>
                ))}
            </View>
        </ModalContent>
    );
}
