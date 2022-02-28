import React, { useState } from 'react';
import { Box, Flex, Button, useColorModeValue, Text } from 'native-base';
import Modal from 'react-native-modal';
import { Keyboard, TextInput } from 'react-native';
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
            onSwipeComplete={() => setShowModal(false)}
            swipeDirection="down"
            isVisible={showModal}
            swipeThreshold={300}
            avoidKeyboard={true}
            onBackdropPress={() => Keyboard.dismiss()}
        >
            <Box bg={useColorModeValue('gray.100', 'gray.800')} rounded="3xl">
                <Text textAlign="center" fontSize="lg" fontWeight={700} marginTop="10px">
                    Note
                </Text>
                <Box p={3}>
                    <TextInput
                        placeholder="Write a note/reflection"
                        multiline={Platform.OS === 'android' ? false : true}
                        autoCorrect={false}
                        style={{
                            borderRadius: 10,
                            backgroundColor: useColorModeValue('white', colors.black),
                            padding: 15,
                            color: useColorModeValue('black', 'white'),
                            height: 240,
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
                    <Button.Group colorScheme="rose" space={2}>
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
                                if (!!inputText) {
                                    handleNoteInput();
                                    setShowModal(false);
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

export default NoteModal;
