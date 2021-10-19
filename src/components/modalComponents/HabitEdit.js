import React from 'react';
import { ActivityIndicator, ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import {
    FrequencySwitchContainer,
    FrequencyTouchable,
    HabitCentered,
    HabitDescriptionInput,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    HomeheaderContainer,
    ModalContent,
    SelectHabitColorButton,
} from '../../utils/StyledComponents/Styled';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons, Feather } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import { habitBoxShadow } from '../../utils/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../ColorPalletteModal';
import { useRef } from 'react';
import Frequency from '../Frequency';

export default function HabitEditContent({
    methods: {
        handleSubmit,
        updateColor,
        toggleSwitchSpecific,
        onChangeSpecific,
        toggleSwitch,
        toggleSwitchDate,
        onChangeReminderTime,
    },
    setters: {
        setEditHabitModalVisible,
        setStateDescription,
        setDaysCount,
        setTimesCount,
        setHabitUnitValue,
    },
    states: {
        habitName,
        habitUnitValue,
        loading,
        stateDescription,
        daysCount,
        timesCount,
        isEnabled,
        isEnabledDate,
        isEnabledSpecific,
        color,
        colorUpdated,
        updatedColor,
        habitReminderTime,
    },
}) {
    const sheetRef = useRef(null);

    return (
        <ModalContent>
            <HomeheaderContainer>
                <TouchableOpacity
                    style={{ marginLeft: 10, marginTop: 10 }}
                    onPress={() => setEditHabitModalVisible(false)}
                >
                    <Ionicons name="close-circle-sharp" size={34} color="gray" />
                </TouchableOpacity>
                <Text twentyTwo fontFamily="Extra">
                    Edit Habit
                </Text>
                <TouchableOpacity onPress={handleSubmit}>
                    <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                        {loading ? (
                            <ActivityIndicator color={colors.mainGreen} />
                        ) : (
                            <Text color={colors.mainGreen}>Update</Text>
                        )}
                    </Text>
                </TouchableOpacity>
            </HomeheaderContainer>

            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitCentered>
                        <HabitDescriptionInput
                            keyboardAppearance="dark"
                            multiline={true}
                            autoCorrect={false}
                            placeholder={stateDescription}
                            placeholderTextColor="gray"
                            style={{
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'Bold',
                                ...habitBoxShadow,
                            }}
                            onChangeText={(text) => setStateDescription(text)}
                        />
                    </HabitCentered>
                    <HabitUtilityInfoContainer>
                        <Text left fontFamily="Regular">
                            Color
                        </Text>
                        <SelectHabitColorButton onPress={() => sheetRef.current.show()}>
                            {!colorUpdated ? (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        backgroundColor: updatedColor,
                                    }}
                                />
                            )}
                        </SelectHabitColorButton>

                        <Frequency
                            switchStates={{ isEnabledSpecific, isEnabled, isEnabledDate }}
                            methods={{
                                toggleSwitchSpecific,
                                onChangeSpecific,
                                toggleSwitch,
                                toggleSwitchDate,
                            }}
                            setters={{ setDaysCount, setTimesCount, setHabitUnitValue }}
                            values={{ isEnabledSpecific }}
                            states={{ daysCount, timesCount, habitUnitValue }}
                        />

                        {isEnabledDate && (
                            <DateTimePicker
                                value={habitReminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={onChangeReminderTime}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
                <ActionSheet
                    containerStyle={{
                        backgroundColor: '#141414',
                        height: 270,
                    }}
                    defaultOverlayOpacity={0.6}
                    gestureEnabled="true"
                    elevation={2}
                    ref={sheetRef}
                >
                    <ColorPalletteModal sheetRef={sheetRef} updateColor={updateColor} />
                </ActionSheet>
            </ScrollView>
        </ModalContent>
    );
}
