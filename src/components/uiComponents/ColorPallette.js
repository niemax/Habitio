import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import useSettings from '../../hooks/useSettings';
import { colorPalletteColor, colorPalletteView } from '../../utils/globalStyles';

export default function ColorPalletteModal({ sheetRef, updateColor }) {
    const { habitSelectionColors } = useSettings();
    return (
        <View>
            <View style={colorPalletteView}>
                {habitSelectionColors.map((item, index) => (
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
        </View>
    );
}
