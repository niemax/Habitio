import { Box, Center, useColorModeValue } from 'native-base';
import React from 'react';
import { Keyboard, View } from 'react-native';
import Modal from 'react-native-modal';
import { habitColor } from '../../utils/globalStyles';
import { SelectHabitColorButton } from '../../utils/StyledComponents/Styled';
import ColorPalletteModal from './ColorPallette';

export default function HabitColor({
    showModal,
    setShowModal,
    colorUpdated,
    updatedColor,
    updateColor,
    color,
}) {
    return (
        <Center mt={2} ml={3} h={6} w={6} rounded="lg">
            <SelectHabitColorButton>
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
                <Modal
                    onSwipeComplete={() => setShowModal(false)}
                    swipeDirection="down"
                    isVisible={showModal}
                    swipeThreshold={300}
                    avoidKeyboard={true}
                    animationInTiming={700}
                    animationOutTiming={700}
                    backdropTransitionOutTiming={0}
                    hideModalContentWhileAnimating={true}
                    style={{ justifyContent: 'flex-end', marginBottom: 30, marginHorizontal: 10 }}
                    onBackdropPress={() => setShowModal(false)}
                >
                    <Box bg={useColorModeValue('gray.100', 'gray.800')} rounded="3xl" px={2}>
                        <ColorPalletteModal updateColor={updateColor} setShowModal={setShowModal} />
                    </Box>
                </Modal>
            </SelectHabitColorButton>
        </Center>
    );
}
