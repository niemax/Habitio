import React from 'react';
import { View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../utils/Text';
import { ModalContent } from '../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
import { habitSelectionColors } from '../utils/colors';

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
                <ScrollView>
                    {habitSelectionColors.map((item, index) => (
                        <View
                            key={index.toString()}
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
                                    borderRadius: 100,
                                    backgroundColor: `${item}`,
                                }}
                            />
                        </View>
                    ))}
                </ScrollView>
            </ModalContent>
        </Modal>
    );
}
