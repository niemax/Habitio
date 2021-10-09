import React from 'react';
import Text from '../utils/Text';
import ActionSheet from 'react-native-actions-sheet';
import { DiaryInput } from '../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { habitBoxShadow } from '../utils/globalStyles';
import { format } from 'date-fns';
import { TouchableOpacity, View } from 'react-native';

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
                height: 460,
                flex: 1,
            }}
            bounciness={0}
            defaultOverlayOpacity={0.6}
            keyboardDismissMode="interactive"
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
                How was it?
            </Text>
            <Text left marginLeft="15px" marginTop="10px" sixteen color="gray">
                <Feather name="check-circle" size={18} color={colors.mainGreen} />
                {name}
            </Text>
            <DiaryInput
                keyboardAppearance="dark"
                autoCorrect={false}
                headerAlwaysVisible="true"
                autoFocus={true}
                value={diaryInput}
                multiline={true}
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
        </ActionSheet>
    );
}
