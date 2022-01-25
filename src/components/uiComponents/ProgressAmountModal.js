import React, { useState } from 'react';
import { Box, Flex, Modal, Button } from 'native-base';
import { TextInput } from 'react-native';
import { colors } from '../../utils/colors';
import Text from '../../utils/Text';

const ProgressAmountModal = ({ showProgressModal, setShowProgressModal, handleHabitProgress }) => {
    const [progressAmount, setProgressAmount] = useState();
    return (
        <Modal
            size="xl"
            isOpen={showProgressModal}
            onClose={() => setShowProgressModal(false)}
            avoidKeyboard
            animationPreset="slide"
        >
            <Modal.Content maxWidth="400px" bg="gray.800" rounded="2xl">
                <Text fontFamily="Extra" marginTop="10px">
                    Add progress
                </Text>
                <Box p={4}>
                    <TextInput
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                        autoCorrect={false}
                        placeholderTextColor="gray"
                        style={{
                            borderRadius: 10,
                            backgroundColor: colors.black,
                            padding: 8,
                            color: 'white',
                            fontSize: 22,
                            fontFamily: 'Extra',
                            marginBottom: 20,
                        }}
                        onChangeText={(text) => setProgressAmount(text)}
                    />
                </Box>
                <Flex direction="row" bg="gray.800" justify="space-around" mb={4}>
                    <Button.Group colorScheme="green" space={2}>
                        <Button
                            size="lg"
                            bg="gray.700"
                            rounded="xl"
                            w={150}
                            h={50}
                            variant="subtle"
                            onPress={() => {
                                setShowProgressModal(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            w={150}
                            h={50}
                            variant="subtle"
                            rounded="xl"
                            onPress={() => {
                                handleHabitProgress(progressAmount);
                                setShowProgressModal(false);
                            }}
                        >
                            Done
                        </Button>
                    </Button.Group>
                </Flex>
            </Modal.Content>
        </Modal>
    );
};

export default ProgressAmountModal;
