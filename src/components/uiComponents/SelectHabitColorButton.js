import { useColorModeValue } from 'native-base';
import React, { useRef } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { colors } from '../../utils/colors';
import { habitColor } from '../../utils/globalStyles';
import { SelectHabitColorButton } from '../../utils/StyledComponents/Styled';
import ColorPalletteModal from './ColorPallette';

export default function HabitColor({ colorUpdated, updatedColor, updateColor, color }) {
    const sheetRef = useRef(null);
    return (
        <SelectHabitColorButton onPress={() => sheetRef.current.show()}>
            {!colorUpdated ? (
                <View
                    style={{
                        backgroundColor: color,
                        ...habitColor,
                    }}
                />
            ) : (
                <View
                    style={{
                        backgroundColor: updatedColor,
                        ...habitColor,
                    }}
                />
            )}
            <ActionSheet
                containerStyle={{
                    backgroundColor: useColorModeValue(colors.white, colors.black),
                    height: 270,
                    borderRadius: 35,
                }}
                defaultOverlayOpacity={0.3}
                elevation={2}
                ref={sheetRef}
            >
                <ColorPalletteModal updateColor={updateColor} sheetRef={sheetRef} />
            </ActionSheet>
        </SelectHabitColorButton>
    );
}
