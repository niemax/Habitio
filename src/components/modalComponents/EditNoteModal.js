import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { CalendarHeader, DiaryInput, ModalContent } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { handleDiaryInputDelete } from '../../utils/helpers/handleDiaryInputDelete';

export default function EditNoteModal({
    editNoteModalVisible,
    setEditNoteModalVisible,
    date,
    diaryInputs,
    input,
    id,
    habitSetter,
    data,
}) {
    const [diaryInput, setDiaryInput] = useState('');
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
                    <TouchableOpacity
                        onPress={() => {
                            handleDiaryInputDelete(diaryInputs, id, habitSetter, data, diaryInput);
                            setEditNoteModalVisible(false);
                        }}
                    >
                        <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                            <Text color={colors.mainGreen}>Save</Text>
                        </Text>
                    </TouchableOpacity>
                </CalendarHeader>
                <DiaryInput
                    keyboardAppearance="dark"
                    autoCorrect={false}
                    headerAlwaysVisible="true"
                    autoFocus={true}
                    multiline={Platform.OS === 'ios' ? true : false}
                    placeholder={input}
                    placeholderTextColor="gray"
                    style={{
                        color: 'white',
                        fontSize: 17,
                        fontFamily: 'SemiBold',
                    }}
                    onChangeText={(text) => setDiaryInput(text)}
                />
            </ModalContent>
        </Modal>
    );
}
