import React from 'react';
import { Modal, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Text from '../utils/Text';
import { colors } from '../utils/colors';
import { AddDiaryModalHeaderContainer, ModalContent } from '../utils/StyledComponents/Styled';

export default function AddDiaryModal({ modalDiaryVisible, modalizeRef }) {
    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={modalDiaryVisible}>
            <ModalContent>
                <Text>Modal</Text>
            </ModalContent>
        </Modal>
    );
}
