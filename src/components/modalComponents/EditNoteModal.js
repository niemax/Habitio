import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { CalendarHeader, DiaryInput, ModalContent } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { handleNoteDelete, handleNoteEdit } from '../../utils/helpers/noteMethods';
import { useHabits } from '../../context/HabitProvider';
import { formatDateForInputModal } from '../../utils/helpers/dateHelpers';

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
                    onPress: () => {
                        handleNoteDelete(id, habits, diaryInputs, data, habitSetter);
                        setEditNoteModalVisible(false);
                    },
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
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.OS == 'ios' ? 50 : 0}
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                >
                    <CalendarHeader style={{ marginTop: 60 }}>
                        <TouchableOpacity onPress={() => setEditNoteModalVisible(false)}>
                            <Ionicons name="close-circle-sharp" size={34} color="gray" />
                        </TouchableOpacity>
                        <Text left fontFamily="Bold" twentyTwo color="gray">
                            {formatDateForInputModal(date)}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={displayDeleteAlert}>
                                <Feather name="trash" size={26} color={colors.error} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleNoteEdit(
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
                                <Feather
                                    name="check"
                                    size={32}
                                    color={colors.mainGreen}
                                    style={{ marginLeft: 15 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </CalendarHeader>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrInput('');
                                textInputRef.current.focus();
                            }}
                        >
                            <Text
                                left
                                marginLeft="15px"
                                marginTop="50px"
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
                    </ScrollView>
                </KeyboardAvoidingView>
            </ModalContent>
        </Modal>
    );
}
