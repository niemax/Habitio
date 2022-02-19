import { Box, Center, Flex, useColorModeValue } from 'native-base';
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
        <Center
            bg="gray.800"
            mt={2}
            ml={3}
            h={10}
            w={10}
            bg={useColorModeValue('gray.200', 'gray.700')}
            rounded="lg"
        >
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
                        backgroundColor: useColorModeValue(colors.white, colors.mainBackground),
                        height: 200,
                        borderRadius: 35,
                    }}
                    defaultOverlayOpacity={0.3}
                    elevation={2}
                    ref={sheetRef}
                >
                    <ColorPalletteModal updateColor={updateColor} sheetRef={sheetRef} />
                </ActionSheet>
            </SelectHabitColorButton>
        </Center>
    );
}
