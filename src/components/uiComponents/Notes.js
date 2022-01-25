import React, { useState } from 'react';
import { TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { colors } from '../../utils/colors';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';
import Text from '../../utils/Text';
import { Entypo } from '@expo/vector-icons';
import { Flex, Modal, Button, Box, Container } from 'native-base';

const Notes = ({ notes, data }) => {
    const [showModal, setShowModal] = useState(false);
    const [noteRenderAmount, setNoteRenderAmount] = useState(2);

    const renderItem = ({ item, index }) =>
        index <= noteRenderAmount && (
            <View key={item.id}>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text
                        fontFamily="Bold"
                        color={colors.mainGreen}
                        left
                        marginLeft="15px"
                        marginBottom="3px"
                    >
                        {formatDateForHabitEndDate(item.date)}
                    </Text>
                    <Text
                        numberOfLines={1}
                        marginBottom="15px"
                        marginLeft="15px"
                        left
                        fifteen
                        fontFamily="Regular"
                    >
                        {item.input}
                    </Text>
                </TouchableOpacity>

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
                        <Box p={4}>
                            <TextInput
                                keyboardAppearance="dark"
                                multiline={Platform.OS === 'android' ? false : true}
                                autoCorrect={false}
                                value={item.input}
                                placeholderTextColor="gray"
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: colors.black,
                                    padding: 15,
                                    color: 'white',
                                    fontSize: 17,
                                    fontFamily: 'SemiBold',
                                    marginBottom: 20,
                                }}
                            />
                        </Box>
                        <Flex direction="row" bg="gray.800" justify="space-around" mb={4}>
                            <Button.Group colorScheme="green" space={2}>
                                <Button
                                    size="lg"
                                    bg="gray.700"
                                    rounded="lg"
                                    w={150}
                                    h={50}
                                    variant="subtle"
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button w={150} h={50} variant="subtle" rounded="lg">
                                    Done
                                </Button>
                            </Button.Group>
                        </Flex>
                    </Modal.Content>
                </Modal>
            </View>
        );

    return (
        <>
            {Object.values(notes).length === 0 && (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text sixteen fontFamily="MediumItalic" color="gray">
                        No notes added yet. Tap on a date to add a note.
                    </Text>
                    <Entypo
                        name="pencil"
                        size={62}
                        color={colors.mainGreen}
                        style={{ marginTop: 30 }}
                    />
                </View>
            )}
            <FlatList
                data={Object.values(notes).sort((a, b) => new Date(b.date) - new Date(a.date))}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setNoteRenderAmount(noteRenderAmount + 3);
                            }}
                        >
                            <Text>Load more</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );
};

export default Notes;
