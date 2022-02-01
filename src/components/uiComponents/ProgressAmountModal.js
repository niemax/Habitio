import React, { useState } from 'react';
import { Box, Flex, Modal, Button, Text, useColorModeValue } from 'native-base';
import { TextInput } from 'react-native';
import { colors } from '../../utils/colors';

const ProgressAmountModal = ({ showProgressModal, setShowProgressModal, setHabitProgress }) => {
    const [progressAmount, setProgressAmount] = useState();
    return (
        <Modal
            size="xl"
            isOpen={showProgressModal}
            onClose={() => setShowProgressModal(false)}
            avoidKeyboard
            animationPreset="slide"
            isKeyboardDismissable={true}
        >
            <Modal.Content
                maxWidth="400px"
                bg={useColorModeValue('gray.100', 'gray.800')}
                rounded="2xl"
            >
                <Text textAlign="center" fontSize="lg" fontWeight={700} marginTop="10px">
                    Change Value
                </Text>
                <Box p={4}>
                    <TextInput
                        returnKeyType="done"
                        enablesReturnKeyAutomatically={true}
                        autoFocus={true}
                        keyboardType="numeric"
                        autoCorrect={false}
                        placeholderTextColor="gray"
                        style={{
                            borderRadius: 10,
                            backgroundColor: useColorModeValue('white', colors.black),
                            padding: 8,
                            color: useColorModeValue('black', 'white'),
                            fontSize: 22,
                            marginBottom: 20,
                        }}
                        onChangeText={(text) => setProgressAmount(text)}
                    />
                </Box>
                <Flex
                    direction="row"
                    bg={useColorModeValue('gray.100', 'gray.800')}
                    justify="space-around"
                    mb={4}
                >
                    <Button.Group colorScheme="indigo" space={2}>
                        <Button
                            size="lg"
                            bg={useColorModeValue('gray.200', 'gray.700')}
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
                                if (Number(progressAmount)) {
                                    setHabitProgress(Number(progressAmount));
                                    setShowProgressModal(false);
                                }
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
