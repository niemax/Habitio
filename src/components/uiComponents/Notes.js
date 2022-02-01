import React, { useState } from 'react';
import { TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { colors } from '../../utils/colors';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';
import { Entypo } from '@expo/vector-icons';
import {
    Center,
    Flex,
    Modal,
    Text,
    Button,
    useColorModeValue,
    NativeBaseProvider,
    Box,
    useColorMode,
} from 'native-base';

const Notes = ({ notes }) => {
    const [showModal, setShowModal] = useState(false);
    const [noteRenderAmount, setNoteRenderAmount] = useState(2);
    const { colorMode } = useColorMode();

    const renderItem = ({ item, index }) =>
        index <= noteRenderAmount && (
            <NativeBaseProvider>
                <View key={item.id}>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Text
                            fontWeight={700}
                            color={colors.mainPurple}
                            marginLeft="15px"
                            marginBottom="3px"
                        >
                            {formatDateForHabitEndDate(item.date)}
                        </Text>
                        <Text numberOfLines={1} marginBottom="15px" marginLeft="15px">
                            {item.input}
                        </Text>
                    </TouchableOpacity>
                </View>
            </NativeBaseProvider>
        );

    return (
        <>
            {Object.values(notes).length === 0 && (
                <Center>
                    <Text> No notes added yet. Tap on a date to add a note.</Text>
                    <Entypo
                        name="pencil"
                        size={62}
                        color={colors.mainPurple}
                        style={{ marginTop: 30 }}
                    />
                </Center>
            )}
            <FlatList
                lazy
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
                            <Text textAlign="center">Load more</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );
};

export default Notes;
