import React from 'react';
import Text from '../../utils/Text';
import ActionSheet from 'react-native-actions-sheet';
import { DiaryInput } from '../../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { habitBoxShadow } from '../../utils/globalStyles';
import { format } from 'date-fns';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';

const NoteSheet = ({
    noteInput,
    setNoteInput,
    noteSheetRef,
    selectedDay,
    name,
    handleNoteInput,
}) => {
    return (
        <KeyboardAvoidingView>
            <ActionSheet
                containerStyle={{
                    backgroundColor: colors.mainBackground,
                    height: 520,
                    borderRadius: 10,
                }}
                defaultOverlayOpacity={0.3}
                gestureEnabled="true"
                elevation={2}
                bounciness={0}
                extraScroll={80}
                ref={noteSheetRef}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text left marginLeft="15px" color="gray" twenty fontFamily="Medium">
                        {format(new Date(selectedDay), 'dd-MM-yyyy')}
                    </Text>
                    <TouchableOpacity
                        onPress={() => noteInput !== '' && handleNoteInput()}
                        style={{ marginRight: 15 }}
                    >
                        <Text color={colors.mainGreen} fontFamily="SemiBold">
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text left marginLeft="15px" marginTop="15px" fontFamily="SemiBold" twentyTwo>
                    Add a Note
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
                    <Feather name="check" size={18} color={colors.mainGreen} />
                    <Text left marginLeft="2px" sixteen color="gray">
                        {name}
                    </Text>
                </View>
                <DiaryInput
                    keyboardAppearance="dark"
                    autoCorrect={false}
                    headerAlwaysVisible="true"
                    autoFocus={true}
                    multiline={Platform.OS === 'ios' ? true : false}
                    value={noteInput}
                    placeholder="Write a Reflection"
                    placeholderTextColor="gray"
                    style={{
                        color: 'white',
                        fontSize: 17,
                        fontFamily: 'SemiBold',
                        ...habitBoxShadow,
                    }}
                    onChangeText={(text) => setNoteInput(text)}
                />
            </ActionSheet>
        </KeyboardAvoidingView>
    );
};

export default NoteSheet;
