import React, { useState } from 'react';
import { Alert, Modal, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ModalContent, ModalView } from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';

export default function AddModal({ modalVisible, setModalVisible }) {
    return (
        <View>
            <Modal
                animationType="slide"
                presentationStyle="pageSheet"
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalContent>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{ marginLeft: 10, marginTop: 10 }}
                    >
                        <Ionicons name="close-circle-sharp" size={34} color="gray" />
                    </TouchableOpacity>
                    <Text left marginLeft="10px" thirtyFour fontFamily="Bold" marginTop="10px">
                        Add a goal
                    </Text>
                </ModalContent>
            </Modal>
        </View>
    );
}
