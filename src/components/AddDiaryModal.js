import React from 'react';
import { Modal } from 'react-native';
import Text from '../utils/Text';
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
