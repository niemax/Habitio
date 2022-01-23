import React, { useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { colors } from '../../utils/colors';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';
import Text from '../../utils/Text';
import { Entypo } from '@expo/vector-icons';
import EditNoteModal from '../modalComponents/EditNoteModal';

const Notes = ({ notes, editNoteModalVisible, setEditNoteModalVisible, data }) => {
    const [noteRenderAmount, setNoteRenderAmount] = useState(2);

    const renderItem = ({ item, index }) =>
        index <= noteRenderAmount && (
            <View key={item.id}>
                <TouchableOpacity onPress={() => setEditNoteModalVisible(index)}>
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
                <EditNoteModal
                    editNoteModalVisible={editNoteModalVisible === index}
                    setEditNoteModalVisible={setEditNoteModalVisible}
                    date={item.date}
                    id={item.id}
                    currentInput={item.input}
                    diaryInputs={notes}
                    data={data}
                />
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
