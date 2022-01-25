import React, { useState } from 'react';
import { Box, Flex, Modal, Button } from 'native-base';
import { TextInput } from 'react-native';
import { colors } from '../../utils/colors';
import Text from '../../utils/Text';
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
            size="xl"
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            avoidKeyboard
            animationPreset="slide"
        >
            <Modal.Content maxWidth="400px" bg="gray.800" rounded="2xl">
                <Text fontFamily="Extra" marginTop="10px">
                    Note
                </Text>
                <Box p={3}>
                    <TextInput
                        keyboardAppearance="dark"
                        multiline={Platform.OS === 'android' ? false : true}
                        autoCorrect={false}
                        style={{
                            borderRadius: 20,
                            backgroundColor: colors.black,
                            padding: 15,
                            color: 'white',
                            height: 220,
                            fontSize: 18,
                            fontFamily: 'SemiBold',
                        }}
                        onChangeText={(text) => setInputText(text)}
                    />
                </Box>
                <Flex direction="row" bg="gray.800" justify="space-around" mb={4}>
                    <Button.Group colorScheme="emerald" space={2}>
                        <Button
                            size="lg"
                            bg="gray.700"
                            rounded="xl"
                            w={150}
                            h={50}
                            variant="subtle"
                            onPress={() => {
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
                                handleNoteInput();
                                setShowModal(false);
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
