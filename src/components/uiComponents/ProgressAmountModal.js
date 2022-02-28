import React, { useState } from 'react';
import { Box, Flex, Button, Text, useColorModeValue } from 'native-base';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native';
import { colors } from '../../utils/colors';
import { useHabits } from '../../context/HabitProvider';

const ProgressAmountModal = ({
    showProgressModal,
    setShowProgressModal,
    setHabitProgress,
    times,
    id,
}) => {
    const [progressAmount, setProgressAmount] = useState(times);
    const { habits, habitSetter } = useHabits();

    const handleChangeValue = (amount) => {
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                habit.progress = amount;
            }
            return habit;
        });
        habitSetter(mapped);
    };

    return (
        <Modal
            isVisible={showProgressModal}
            onBackdropPress={() => setShowProgressModal(false)}
            onSwipeComplete={() => setShowProgressModal(false)}
            swipeDirection="down"
            swipeThreshold={300}
            avoidKeyboard={true}
        >
            <Box maxWidth="400px" bg={useColorModeValue('gray.100', 'gray.800')} rounded="2xl">
                <Text textAlign="center" fontSize="lg" fontWeight={700} marginTop="10px">
                    Change Value
                </Text>
                <Box p={4}>
                    <TextInput
                        returnKeyType="done"
                        enablesReturnKeyAutomatically={true}
                        keyboardType="numeric"
                        autoFocus={true}
                        autoCorrect={false}
                        value={progressAmount}
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
                    <Button.Group colorScheme="rose" space={2}>
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
                                    handleChangeValue(Number(progressAmount));
                                    setShowProgressModal(false);
                                }
                            }}
                        >
                            Done
                        </Button>
                    </Button.Group>
                </Flex>
            </Box>
        </Modal>
    );
};

export default ProgressAmountModal;
