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
                backgroundColor: colors.mainBackground,
                height: 520,
                borderRadius: 30,
            }}
            defaultOverlayOpacity={0.3}
            gestureEnabled="true"
            elevation={2}
            bounciness={0}
            extraScroll={80}
            ref={sheetRef}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text left marginLeft="15px" color="gray" twenty fontFamily="Medium">
                    {format(new Date(selectedDay), 'dd-MM-yyyy')}
                </Text>
                <TouchableOpacity
                    onPress={() => diaryInput !== '' && handleDiaryInput()}
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
