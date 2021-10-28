import React, { useState, useEffect, useRef } from 'react';
import { Alert, Modal, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { CalendarHeader, DiaryInput, ModalContent } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { deleteDiaryInput, handleDiaryInputEdit } from '../../utils/helpers/handleDiaryInputDelete';
import { useHabits } from '../../context/HabitProvider';

export default function EditNoteModal({
    editNoteModalVisible,
    setEditNoteModalVisible,
    date,
    currentInput,
    diaryInputs,
    id,
    data,
}) {
    const { habitSetter, habits } = useHabits();
    const [currInput, setCurrInput] = useState('');
    const textInputRef = useRef(null);

    const displayDeleteAlert = () =>
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () => deleteDiaryInput(id, habits, diaryInputs, data, habitSetter),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );

    useEffect(() => {
        setCurrInput(currentInput);
    }, []);

    return (
        <Modal animationType="slide" presentationStyle="fullScreen" visible={editNoteModalVisible}>
            <ModalContent>
                <CalendarHeader style={{ marginTop: 60 }}>
                    <TouchableOpacity onPress={() => setEditNoteModalVisible(false)}>
                        <Ionicons name="close-circle-sharp" size={34} color="gray" />
                    </TouchableOpacity>
                    <Text left marginLeft="10px" fontFamily="Bold" twentyTwo>
                        {date}
                    </Text>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity
                            onPress={() => {
                                handleDiaryInputEdit(
                                    diaryInputs,
                                    id,
                                    habitSetter,
                                    habits,
                                    data,
                                    currInput
                                );
                                setEditNoteModalVisible(false);
                            }}
                        >
                            <Text color={colors.mainGreen} fontFamily="SemiBold">
                                Save
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => displayDeleteAlert()}>
                            <Text color={colors.error} marginTop="20px" fontFamily="SemiBold">
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </CalendarHeader>
                <TouchableOpacity
                    onPress={() => {
                        setCurrInput('');
                        textInputRef.current.focus();
                    }}
                >
                    <Text
                        left
                        marginLeft="15px"
                        marginTop="10px"
                        fontFamily="Bold"
                        color={colors.mainGreen}
                    >
                        Clear text
                    </Text>
                </TouchableOpacity>
                <DiaryInput
                    ref={textInputRef}
                    keyboardAppearance="dark"
                    clearButtonMode="always"
                    autoCorrect={false}
                    headerAlwaysVisible="true"
                    autoFocus={true}
                    multiline={Platform.OS === 'ios' ? true : false}
                    value={currInput}
                    placeholder="Edit note"
                    placeholderTextColor="gray"
                    style={{
                        color: 'white',
                        fontSize: 17,
                        fontFamily: 'SemiBold',
                    }}
                    onChangeText={(text) => setCurrInput(text)}
                />
            </ModalContent>
        </Modal>
    );
}
