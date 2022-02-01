import React, { useState } from 'react';
import { Box, Flex, Modal, Button, useColorModeValue, Text } from 'native-base';
import { TextInput } from 'react-native';
import { colors } from '../../utils/colors';
import { useHabits } from '../../context/HabitProvider';

const NoteModal = ({ showModal, setShowModal, id }) => {
    const [inputText, setInputText] = useState('');
    const [selectedDay] = useState(new Date());

    const { habitSetter, habits } = useHabits();

    const handleNoteInput = () => {
        const noteInputObj = {
            date: selectedDay,
            input: inputText,
            id: Math.floor(Math.random() * 100000),
        };
        try {
            const updatedHabits = habits.map((habit) => {
                if (habit.id === id) {
                    habit.noteInputs.push(noteInputObj);
                }
                return habit;
            });
            habitSetter(updatedHabits);
        } catch (error) {
            console.error(error);
        }
        setInputText('');
    };

    return (
        <Modal
            size="lg"
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            avoidKeyboard
            animationPreset="slide"
        >
            <Modal.Content bg={useColorModeValue('gray.100', 'gray.800')} rounded="2xl">
                <Text textAlign="center" fontSize="lg" fontWeight={700} marginTop="10px">
                    Note
                </Text>

                <Box p={3}>
                    <TextInput
                        multiline={Platform.OS === 'android' ? false : true}
                        autoCorrect={false}
                        style={{
                            borderRadius: 20,
                            backgroundColor: useColorModeValue('white', colors.black),
                            padding: 15,
                            color: useColorModeValue('black', 'white'),
                            height: 200,
                            fontSize: 16,
                        }}
                        onChangeText={(text) => setInputText(text)}
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
                                setInputText('');
                                setShowModal(false);
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
                                if (inputText !== '') {
                                    handleNoteInput();
                                    setShowModal(false);
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

export default NoteModal;
