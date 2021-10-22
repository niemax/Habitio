import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ModalContent } from '../../utils/StyledComponents/Styled';
import { habitSelectionColors as colors } from '../../utils/colors';

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
                {colors.map((item, index) => (
                    <View key={index.toString()}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log(item);
                                sheetRef.current.hide();
                                updateColor(item);
                            }}
                            style={{
                                margin: 5,
                                width: 35,
                                height: 35,
                                borderRadius: 100,
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
