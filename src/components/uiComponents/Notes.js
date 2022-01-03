import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/colors';
import { formatDateForInputModal } from '../../utils/helpers/dateHelpers';
import Text from '../../utils/Text';
import { Entypo } from '@expo/vector-icons';
import EditNoteModal from '../modalComponents/EditNoteModal';

const Notes = ({ notes, editNoteModalVisible, setEditNoteModalVisible, data }) => (
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
        {Object.values(notes)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(({ date, input, id }, index) => (
                <View key={id}>
                    <TouchableOpacity onPress={() => setEditNoteModalVisible(index)}>
                        <Text
                            fontFamily="Bold"
                            color={colors.mainGreen}
                            left
                            marginLeft="15px"
                            marginBottom="3px"
                        >
                            {formatDateForInputModal(date)}
                        </Text>
                        <Text
                            numberOfLines={1}
                            marginBottom="15px"
                            marginLeft="15px"
                            left
                            fifteen
                            fontFamily="Regular"
                        >
                            {input}
                        </Text>
                    </TouchableOpacity>
                    <EditNoteModal
                        editNoteModalVisible={editNoteModalVisible === index}
                        setEditNoteModalVisible={setEditNoteModalVisible}
                        date={date}
                        id={id}
                        currentInput={input}
                        diaryInputs={notes}
                        data={data}
                    />
                </View>
            ))}
    </>
);

export default Notes;
