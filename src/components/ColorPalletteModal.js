import React, { useState } from 'react';
import Text from '../utils/Text';
import { View, Modal } from 'react-native';
import { ColorModalContainer, ModalContent } from '../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
import { habitSelectionColors } from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ColorPalletteModal({ modalVisible, setModalVisible, updateColor }) {
    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={modalVisible}>
            <ModalContent>
                <TouchableOpacity
                    style={{ marginLeft: 10, marginTop: 10 }}
                    onPress={() => setModalVisible(false)}
                >
                    <Ionicons name="close-circle-sharp" size={34} color="gray" />
                </TouchableOpacity>
                <Text marginTop="15px" fontFamily="Bold" twentyEight>
                    Choose a Color
                </Text>
                {habitSelectionColors.map((item) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginTop: 15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                updateColor(item);
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                backgroundColor: `${item}`,
                            }}
                        />
                    </View>
                ))}
            </ModalContent>
        </Modal>
    );
}
