import React from 'react';
import Text from '../../utils/Text';
import ActionSheet from 'react-native-actions-sheet';
import { DiaryInput } from '../../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { habitBoxShadow } from '../../utils/globalStyles';
import { format } from 'date-fns';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';

export default function CalendarBottomSheet({
    diaryInput,
    sheetRef,
    selectedDay,
    name,
    setDiaryInput,
    handleDiaryInput,
}) {
    return (
        <ActionSheet
            containerStyle={{
                backgroundColor: '#141414',
                height: 520,
            }}
            defaultOverlayOpacity={0.4}
            gestureEnabled="true"
            elevation={2}
            ref={sheetRef}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text left marginLeft="15px" color="gray" twenty fontFamily="Medium">
                    {format(new Date(selectedDay), 'dd-MM-yyyy')}
                </Text>
                <TouchableOpacity onPress={handleDiaryInput} style={{ marginRight: 15 }}>
                    <Text color={colors.mainGreen} fontFamily="SemiBold">
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
            <Text left marginLeft="15px" marginTop="15px" fontFamily="SemiBold" twentyTwo>
                Add a Note
            </Text>
            <Text left marginLeft="15px" marginTop="10px" sixteen color="gray">
                <Feather name="check-circle" size={18} color={colors.mainGreen} />
                {name}
            </Text>
            <KeyboardAvoidingView>
                <DiaryInput
                    keyboardAppearance="dark"
                    autoCorrect={false}
                    headerAlwaysVisible="true"
                    autoFocus={true}
                    multiline={Platform.OS === 'ios' ? true : false}
                    value={diaryInput}
                    placeholder="Write a Reflection"
                    placeholderTextColor="gray"
                    style={{
                        color: 'white',
                        fontSize: 17,
                        fontFamily: 'SemiBold',
                        ...habitBoxShadow,
                    }}
                    onChangeText={(text) => setDiaryInput(text)}
                />
            </KeyboardAvoidingView>
        </ActionSheet>
    );
}
